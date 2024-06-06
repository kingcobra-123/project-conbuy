import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import crypto, { verify } from 'crypto';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { create } from 'domain';
import User from './models/user.js';
import Post from './models/Post.js';
import Category from './models/categories.js';
import { users, posts, categories } from './data/index.js';
import { verifyToken } from './middleware/auth.js';


// configuratios
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

app.post("/posts", verifyToken, upload.single('picture'), createPost);


// Routes
app.use('/auth', authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Mongoose setup

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.AZURE_COSMOS_CONNECTIONSTRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      // to load test data - RUN ONLY ONCE!!!
      // User.insertMany(users);
      // Post.insertMany(posts);
      // Category.insertMany(categories);
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });
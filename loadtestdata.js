import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Post from "./models/Post.js";
import Category from "./models/categories.js";
import { users, posts, categories } from "./data/index.js";

dotenv.config();

const loadData = async () => {
  try {
    await mongoose.connect(process.env.AZURE_COSMOS_CONNECTIONSTRING);
    console.log("Database connected");

    // Insert data
    await User.insertMany(users);
    await Post.insertMany(posts);
    await Category.insertMany(categories);

    console.log("Test data inserted successfully");

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting test data:", err);
  }
};

loadData();

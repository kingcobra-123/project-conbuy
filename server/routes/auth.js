import express from 'express';
// import login from '../controllers/auth.js';
import { register, login, verifyEmail } from '../controllers/auth.js';
import { get } from 'mongoose';
import { getCategories } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/verifyemail/:token", verifyEmail);
router.get('/categories', getCategories);

export default router;
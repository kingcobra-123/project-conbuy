import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { getFriendPosts, createPost } from "../controllers/posts.js";
import { paginatedResults } from "../middleware/pagination.js";
import Post from "../models/Post.js";
import { getPost } from "../controllers/posts.js";

const router = express.Router();

// Read Routes
router.get("/", paginatedResults(Post), getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);
router.get("/:friendId/friends", verifyToken, getFriendPosts);
router.get("/review/:postId", verifyToken, getPost);

// Update Routes
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/createpost", verifyToken, createPost);

export default router;
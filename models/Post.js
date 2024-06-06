import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 500,
    },
    content: {
        type: String,
        required: true,
    },
    picturePath: {
        type: Array,
        default: [],
    },
    videoPath: {
        type: Array,
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
    buyOrNotBuy: {
        type: Boolean,
        default: false,
    },
    purchaseLink: String,
    purchaseDate: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const Post = mongoose.model('Post', postSchema);

export default Post;
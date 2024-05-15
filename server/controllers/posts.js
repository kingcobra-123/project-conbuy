import { get } from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/user.js';
import { getUserFriends } from './users.js';
import mongoose from 'mongoose';


// Create Post
export const createPost = async (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    try {

        const {
            userId, 
            description, 
            content, 
            picturePath, 
            videoPath, 
            category,
            subCategory,
            purchaseLink,
            purchaseDate,
            buyOrNotBuy} = req.body;

        const user = await User.findById(userId);
        const newPost = new Post({
            userId: user._id,
            displayName: user.displayName,
            userPicture: user.picturePath,
            postId: new mongoose.Types.ObjectId(),
            description: description,
            content: content,
            picturePath: picturePath,
            videoPath: videoPath,
            category: category,
            subCategory: subCategory,
            purchaseLink: purchaseLink,
            purchaseDate: purchaseDate,
            buyOrNotBuy: buyOrNotBuy,
        })
        
        await newPost.save();

        console.log(newPost.postId);
        res.status(201).json(newPost.postId);
        
        ;} catch (error) {
            console.log('Error: ', error);
            res.status(409).json({ message: error.message });
        }
    }


// Read Post

export const getFeedPosts = (req, res) => {
    console.log(JSON.stringify(res.paginatedResults, null, 2) );
    const updatedPosts = res.paginatedResults.results.map((post) => ({
      _id: post._id,
      userId: post.userId,
      description: post.description,
      content: post.content,
      picturePath: post.picturePath,
      videoPath: post.videoPath,
      category: post.category,
      subCategory: post.subCategory,
      purchaseLink: post.purchaseLink,
      purchaseDate: post.purchaseDate,
      buyOrNotBuy: post.buyOrNotBuy,
      likes: post.likes,
      imageHeight: Math.floor(Math.random() * 100) + 200,
    }));

    res.json(res.paginatedResults);

    // try {

    //     const posts = await Post.find();
    //     res.status(200).json(posts);

    // } catch (error) {
    //     res.status(404).json({ message: error.message });
    // }
}

// Read User Posts
export const getUserPosts = async (req, res) => {
    try{
        
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        const updatedPosts = posts.map((post) => {
            return {
                _id: post._id,
                userId: post.userId,
                description: post.description,
                content: post.content,
                picturePath: post.picturePath,
                videoPath: post.videoPath,
                category: post.category,
                subCategory: post.subCategory,
                purchaseLink: post.purchaseLink,
                purchaseDate: post.purchaseDate,
                buyOrNotBuy: post.buyOrNotBuy,
                likes: post.likes,
                imageHeight: Math.floor(Math.random() * 100) + 200,
            };
           
        });
         

        console.log(updatedPosts);
        res.status(200).json(updatedPosts);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// like Post
export const likePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get Friend Posts

export const getFriendPosts = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
          user.friends.map((friendId) => {
            return User.findById(friendId);
          })
        );
        
        const posts = await Post.find();

        const friendsIDs = friends.map((friend) => friend._id.toString());
        const friendsPosts = posts.filter((post) => friendsIDs.includes(post.userId.toString()));
        
        res.status(200).json(friendsPosts);

    } catch (error) {
        console.log('Error: ', error);
        res.status(404).json({ message: error.message });
    }
} 

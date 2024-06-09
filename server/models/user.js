import express from 'express';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    min: 2,
    max: 50,
  },
  displayName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  viewedProfile: Number,
  impressions: Number,
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

  const User = mongoose.model('User', userSchema);

 export default User;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Category from '../models/categories.js';

// Send verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "satish.kokkanti6641@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "support@conbuy.social",
    to: email,
    subject: "Conbuy Account Verification",
    text: `Please click on the link to verify your account: http://localhost:3001/auth/verifyemail/${token}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

// Verify Email Verification Token
export const verifyEmail = async (req, res) => {
     try {
        console.log('Token: ', req.params.token)
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({message: 'Email Verification failed'});
        }
        user.verified = true;
        user.verificationToken = '';
        await user.save();
        res.status(200).json({message: 'Email Verification successful'});

    } catch (error) {
        res.status(500).json({message: 'Verification failed'});
    }
}

// Register a new user
export const register = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ displayName, email, password: hashedPassword });
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        const savedUser = await newUser.save();
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        
        res.status(201).json({ savedUser });
    } catch (error) {
        console.log('Registration error: ', error);
        res.status(500).json({ message: error.message });
    }
}

// Login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        console.log("User logged in: ", user);
        res.status(200).json({ user, token });

    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}

export const getCategories = async (req, res) => {
  try{
    const categories = await Category.find();
    const formattedCategories = categories.flat();
   



    res.status(200).json(formattedCategories);

  } catch (error) {
    console.log('Error fetching categories: ', error);
    res.status(500).json({ message: error.message });
  }
};
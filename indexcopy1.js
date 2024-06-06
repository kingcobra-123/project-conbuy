const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const User = require('./models/user');
const { send } = require('process');

mongoose.connect('mongodb+srv://satishk:VNC08YWDYbn7iFFj@cluster0.ovbdniv.mongodb.net')
.then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database connection error: ', err);
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// function to send verification email
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'satish.kokkanti6641@gmail.com',
            pass: ''
        }
    });     
    const mailOptions = {
        from: 'support@conbuy.social',
        to: email,
        subject: 'Conbuy Account Verification',
        text: `Please click on the link to verify your account: http://localhost:3001/verify/${token}`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.log('Error sending email: ', error);
    }
}

app.post('/register', async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        console.log(displayName, email, password)

        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = new User({ displayName, email, password });

        newUser.verificationToken = crypto.randomBytes(20).toString('hex');
        console.log(newUser)
        const savedUser = await newUser.save();
        console.log('User created: ', savedUser);
        // send verification email
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(201).json({message:'User created'});
    } catch (error) {
        // console.log('Registration error: ', error);
        res.status(500).send(error.message);
    } 
});


// endpoint to verify email

app.get('/verify/:token', async (req, res) => {
    try {
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
})

// function to generate secret key
const generateSecretKey = () => {
    const secretKey =  crypto.randomBytes(32).toString('hex');

    return secretKey;
}

const secretKey = generateSecretKey();

// endpoint to login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if(user.password !== password) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = jwt.sign({email: user.email, id: user._id}, 'secretKey');
        res.status(200).json({user, token});

    } catch (error) {
        res.status(500).json({message: 'Login failed'});
    }
});

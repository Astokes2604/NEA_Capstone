const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const Post = require('../models/Post');
// const User = require('../models/User');

const router = express.Router();

// configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

router.post('/create', upload.single('image'), async (req, res) => {
    const { description } = req.body;
    const userId = req.userId;
    const image = req.file.buffer.toString('base64');

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newPost = new Post({
            userId: user._id,
            username: user.username,
            description,
            image,
        });

        await newPost.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'NEAcustomerservice23@gmail.com',
            subject: `New Post Created by: ${user.username}`,
            text: `User: ${user.username}\nUserID: ${user._id}\nDescription: ${description}`,
            attachments: [
                {
                    filename: 'post-image.jpg',
                    content: Buffer.from(image, 'base64'),
                    contentType: 'image/jpeg'
                }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);

                return res.status(500).send(error.toString());
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(201).send('Post created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating post');
    }
});

module.exports = router;
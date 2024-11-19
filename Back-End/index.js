const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const catalogRouter = require('./routes/catalog');
const orderRoutes = require('./routes/orders');
const Post = require('./models/Post');
const User = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Middleware to authenticate the user using JWT
const authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'NEAcustomerservice23@gmail.com',
        subject: `Contact form from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent: ' + info.response)
        res.status(200).send('Email sent: ' + info.response);
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
});

// User profile route to get logged-in user's data
app.get('/api/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});

// Create Post route
app.post('/createpost', upload.single('image'), async (req, res) => {
    const { description } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).send('No file uploaded');
        }

        console.log('File uploaded:', req.file);

        const newPost = new Post({
            username: user.username,
            description,
            image: req.file.path
        });

        await newPost.save();

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'NEAcustomerservice23@gmail.com',
            subject: `New Post Created by ${user.username}`,
            text: `Description: ${description}\nImage: ${req.file.path}\nUser: ${user.username}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).send('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

// Fetch Posts route
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

// Route to find gyms near a zip code
app.get('/api/gyms', async (req, res) => {
    const { zip, radius } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY || 'AIzaSyDYNBpj2XKkjwEkTmfyVf1mW-MAIfrFWVI';

    console.log(`Received request to find gyms near zip: ${zip}, radius: ${radius}`);

    try {
        // Convert zip code to lat/lng
        const geoResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`);
        console.log('Geocoding response:', geoResponse.data);

        if (geoResponse.data.results.length === 0) {
            return res.status(404).send('Invalid zip code');
        }

        const location = geoResponse.data.results[0].geometry.location;
        const { lat, lng } = location;

        console.log(`Geocoded location: lat=${lat}, lng=${lng}`);

        let gyms = [];
        let nextPageToken = '';
        let keepFetching = true;

        // Fetch all gym locations within the specified radius
        while (keepFetching) {
            const gymResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius * 1609.34}&type=gym&key=${apiKey}&pagetoken=${nextPageToken}`);
            console.log('Gyms response:', gymResponse.data);

            gyms = gyms.concat(gymResponse.data.results);

            nextPageToken = gymResponse.data.next_page_token;

            // If there's no next page token, stop fetching
            if (!nextPageToken) {
                keepFetching = false;
            } else {
                // Wait a bit to avoid hitting the API too quickly
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        // Fetch details for each gym to get hours of operation
        const detailedGyms = await Promise.all(gyms.map(async (gym) => {
            const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${gym.place_id}&fields=name,formatted_address,opening_hours&key=${apiKey}`);
            const details = detailsResponse.data.result;

            // Only include gyms that have opening hours data
            if (details.opening_hours && details.opening_hours.weekday_text) {
                return {
                    name: details.name,
                    address: details.formatted_address,
                    hours: details.opening_hours.weekday_text,
                };
            }

            return null; // Filter out gyms with no operational hours
        }));

        console.log(`Total gyms inside 25 miles for your zip code: ${gyms.length}`);

        // Filter out any null entries resulting from gyms without operational hours
        const operationalGyms = detailedGyms.filter(gym => gym !== null);

        res.json(operationalGyms);
    } catch (error) {
        console.error('Error fetching gyms:', error);
        res.status(500).send('Error fetching gyms');
    }
});

// Cart routes
app.get('/api/cart', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.productId');
        res.json(user.cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
    }
});

app.post('/api/cart', authenticate, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const existingProduct = user.cart.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(201).send('Product added to cart');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('Error adding to cart');
    }
});

app.delete('/api/cart/:productId', authenticate, async (req, res) => {
    const { productId } = req.params;

    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(200).send('Product removed from cart');
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send('Error removing from cart');
    }
});

// Routes
app.use('/catalog', catalogRouter);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

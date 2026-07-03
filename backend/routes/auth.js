const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the blueprint we just made
const router = express.Router();

// REGISTER API
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // 2. Encrypt (hash) the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the new user and save to MongoDB
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        res.status(201).json({ message: "Volunteer registered successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during registration" });
    }
});


// LOGIN API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user exists in our database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Compare the typed password with the encrypted database password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Generate the JWT "VIP Pass"
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // 4. Send the token and user details back to the frontend
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
    }
});

// GET PROFILE API (Private Route)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Find the user by the ID saved inside the token (excluding the password)
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET ALL USERS (For Admin Dashboard)
router.get('/users', authMiddleware, async (req, res) => {
    try {
        // .find() with no arguments fetches EVERY document in the collection
        // .select('-password') ensures we don't accidentally send passwords to the frontend
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error fetching users" });
    }
});

module.exports = router;
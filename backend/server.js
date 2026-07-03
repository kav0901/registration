const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Allow frontend to talk to this backend


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// A simple test route
app.get('/', (req, res) => {
    res.send('Volunteer Registration System Backend is running with MongoDB!');
});

// Import Auth Routes
app.use('/api/auth', require('./routes/auth'));


// Start the server
// Use the environment port provided by Render, or default to 5000 for local testing
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
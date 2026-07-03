const mongoose = require('mongoose');

// Define what a User looks like in our database
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'volunteer' } // Can be 'volunteer' or 'admin'
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

// defining the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
}, { timestamps: true });

// create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
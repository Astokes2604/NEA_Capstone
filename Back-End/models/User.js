const mongoose = require('mongoose');

// Defining the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        }
    ]
}, { timestamps: true });

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;

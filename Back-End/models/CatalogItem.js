const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    colors: { type: [String], required: true },
    sizes: { type: [String], required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
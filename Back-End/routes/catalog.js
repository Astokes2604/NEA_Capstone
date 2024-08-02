const express = require('express');
const CatalogItem = require('../models/CatalogItem');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await CatalogItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await CatalogItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// New route to update quantity
router.put('/updateQuantity/:id', async (req, res) => {
    try {
        const item = await CatalogItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.quantity = req.body.quantity;
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
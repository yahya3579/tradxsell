const express = require('express');
const router = express.Router();
const Product = require('../Schemas/ProductSchema.js');

// Search products by query
router.get('/search', async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        if (products.length === 0) {
            return res.status(200).json({ message: 'No products found matching your search.', products: [] });
        }

        res.status(200).json(products);
    } catch (err) {
        console.error('Error searching for products:', err);
        res.status(500).json({ error: 'Failed to search products' });
    }
});

module.exports = router;

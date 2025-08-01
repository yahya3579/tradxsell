const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        // type: Number, // Updated to Number
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: { // Add this field for storing the rating
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    sellerEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

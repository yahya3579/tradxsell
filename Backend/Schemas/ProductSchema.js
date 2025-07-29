const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');

// Create a custom ID generator: 5-character alphanumeric (a–z, A–Z, 0–9)
const generateShortId = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const productSchema = new mongoose.Schema({
    // id: { type: String, required: true, unique: true },
    id: { type: String, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    latest: { type: Boolean, default: false },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    sizes: [String],
    colors: [String],
    quantity: { type: Number, required: true },
    sellerEmail: { type: String, required: true },
    status: { type: String, enum: ['approved', 'not approved', 'pending'], default: 'pending' },
    description: { type: String },
    type: { type: String, enum: ['local', 'international'], required: true },
    remarks: { type: String, default: '' },
    ratings: {type: [Number], default: [],},  
}, { 
    timestamps: true
});

// ✅ Pre-save hook to assign short custom ID
productSchema.pre('save', function (next) {
    if (!this.id) {
        this.id = `prod-${generateShortId()}`; // e.g., prod-Ab12Xy
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

const mongoose = require('mongoose');

const RFQCustomSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPeriod: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ['under review', 'quoted', 'closed'],
    default: 'under review',
  },
  adminQuote: {
    price: Number,
    message: String,
    sentAt: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('RFQCustom', RFQCustomSchema);
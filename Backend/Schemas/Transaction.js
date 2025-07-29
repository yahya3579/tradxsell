const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user who initiated the payment
        ref: "User",
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate transactions
    },
    orderId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "PKR",
    },
    orderName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
    },
    paymentPortal: {
        type: String, // URL where the payment is processed
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);

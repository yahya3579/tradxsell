const express = require("express");
const axios = require("axios");
const Transaction = require("../Schemas/Transaction");

const router = express.Router();

// Base URL for the payment gateway
const BASE_URL = "https://baseurl.example.com/apg/zingpay";

// Registration API
router.post("/register", async (req, res) => {
    const { userId, ClientCallBackUrl, Currency, Amount, OrderName } = req.body;

    try {
        // Make a request to the payment gateway
        const response = await axios.post(`${BASE_URL}/registration`, {
            ClientCallBackUrl,
            Currency,
            Amount,
            OrderName,
        });

        if (response.data.code === 1) {
            // Save the transaction to the database
            const newTransaction = new Transaction({
                userId, // Associate the transaction with the user
                transactionId: response.data.additionalDetail.TransactionID,
                amount: Amount,
                currency: Currency,
                orderName: OrderName,
                status: "Pending",
                paymentPortal: response.data.additionalDetail.PaymentPortal,
            });

            await newTransaction.save();

            // Send the payment portal URL to the frontend
            res.json({
                success: true,
                message: response.data.message,
                paymentPortal: response.data.additionalDetail.PaymentPortal,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Registration failed",
            });
        }
    } catch (error) {
        console.error("Error in registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

// Callback API
router.post("/callback", async (req, res) => {
    const { TransactionID } = req.query;

    try {
        // Fetch the transaction from the database
        const transaction = await Transaction.findOne({
            transactionId: TransactionID,
        });

        if (!transaction) {
            return res
                .status(404)
                .send("<h2 style='color: red; text-align: center; margin-top: 50px'>Transaction Not Found</h2>");
        }

        // Check the status of the payment
        const response = await axios.post(`${BASE_URL}/callback`, null, {
            params: { TransactionID },
        });

        // Determine the transaction status
        const isPaymentFailed = response.data.includes("Payment FAILED");
        const updatedStatus = isPaymentFailed ? "Failed" : "Success";

        // Update the transaction status in the database
        transaction.status = updatedStatus;
        await transaction.save();

        // Forward the HTML response from the payment gateway
        res.send(response.data);
    } catch (error) {
        console.error("Error in callback:", error.message);
        res.status(500).send("<h2 style='color: red; text-align: center; margin-top: 50px'>Internal Server Error</h2>");
    }
});

module.exports = router;

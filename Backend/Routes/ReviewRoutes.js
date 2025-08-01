const express = require("express");
const router = express.Router();
const Review = require("../Schemas/ReviewsSchema.js");
const Product = require("../Schemas/ProductSchema.js");

// Add new review
router.post("/addnew", async (req, res) => {
  try {
    const productId = req.query.id;
    
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }
    // Fetch the product to get sellerEmail
    const product = await Product.findOne({ $or: [ { id: productId }, { _id: productId } ] });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const review = new Review({
      productId: productId, // Keep as string
      username: req.body.username,
      userEmail: req.body.userEmail,
      review: req.body.review,
      rating: req.body.rating,
      sellerEmail: product.sellerEmail
    });
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get reviews by productId
router.get("/getreviews", async (req, res) => {
  try {
    const { productId } = req.query;
    const userReviews = await Review.find({ productId: productId }); // Keep as string
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reviews by seller's email (old route with header)
router.get("/getreviewsbyid", async (req, res) => {
  try {
    const sellerEmail = req.headers["x-seller-email"];
    if (!sellerEmail) {
      return res.status(400).json({ message: "Seller email not found!" });
    }

    // Find products by seller email
    const products = await Product.find({ sellerEmail });
    const productIds = products.map((product) => product.id);

    if (productIds.length === 0) {
      return res.status(404).json({
        message: "No products found for this seller",
      });
    }

    // Find reviews for products by string productId
    const reviews = await Review.find({
      productId: { $in: productIds }, // Keep as strings
    });

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "No reviews found!",
      });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;


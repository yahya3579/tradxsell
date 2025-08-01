const express = require("express");
const Product = require("../Schemas/ProductSchema.js");
const Review = require("../Schemas/ReviewsSchema.js");
const path = require("path");
const mongoose = require('mongoose');

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const { 
    // id,
    name,
    price,
    latest,
    category,
    subCategory,
    featured,
    sizes,
    colors,
    quantity,
    description,
    type,
  } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;
  const sellerEmail = req.body.sellerEmail;

  try {
    // const existingProduct = await Product.findOne({ id });

    // if (existingProduct) {
    //   return res
    //     .status(400)
    //     .json({ error: "Product with this id already exists" });
    // }

    if (!subCategory) {
      return res.status(400).json({ error: "Sub-category is required" });
    }
    const sanitizedCategory = category.toLowerCase().replace(/\s+/g, "");
    const sanitizedSubCategory = subCategory.trim();

    const newProduct = new Product({
      // id,
      name,
      price,
      imageUrl,
      latest,
      category: sanitizedCategory,
      subCategory: sanitizedSubCategory,
      featured,
      sizes: sizes.split(","),
      colors: colors.split(","),
      quantity,
      sellerEmail,
      description,
      type,
      // No need to include remarks, it will default to an empty string
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: "Error saving product" });
  }
});

router.use(
  "/uploads/images",
  express.static(path.join(__dirname, "../uploads/images"))
);

// router.get("/seller/:email", async (req, res) => {
//   try {
//     const { email } = req.params; // Get email from route parameters
//     const products = await Product.find({ sellerEmail: email }); // Find products by seller email
//     console.log("Products found:", products); // Log products found
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });


router.get("/seller", async (req, res) => {
  try {
    const encodedEmail = req.query.email;
    const email = decodeURIComponent(encodedEmail);
    const products = await Product.find({ sellerEmail: email }); 
    console.log("Products found:", products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latestProducts = await Product.find({
      latest: true,
      status: "approved",
    });
    res.status(200).json(latestProducts);
  } catch (err) {
    console.error("Error fetching latest products:", err);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.status(200).json(featuredProducts);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
});

router.get("/mens", async (req, res) => {
  try {
    const mensProducts = await Product.find({ category: "Mens" });
    res.status(200).json(mensProducts);
  } catch (err) {
    console.error("Error fetching mens products:", err);
    res.status(500).json({ error: "Failed to fetch mens products" });
  }
});

router.get("/womens", async (req, res) => {
  try {
    const womensProducts = await Product.find({ category: "Womens" });
    res.status(200).json(womensProducts);
  } catch (err) {
    console.error("Error fetching womens products:", err);
    res.status(500).json({ error: "Failed to fetch womens products" });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findOne({ _id: productId });

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (err) {
//     console.error("Error fetching product by ID:", err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });


router.get('/', async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      let product = await Product.findOne({ id });
      // If not found, try as MongoDB _id
      if (!product && mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id);
      }
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
  try {
    const productId = req.query.id;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});


// (Before May 20)
// router.get("/product/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findOne({ id: productId });

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (err) {
//     console.error("Error fetching product by ID:", err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });


// (May 20)
router.get("/product", async (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});



router.get("/all/x", async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// (Before May 20)
// router.delete("/:id", async (req, res) => {
//   const productId = req.params.id;

//   try {
//     const deletedProduct = await Product.findOneAndDelete({ id: productId });

//     if (!deletedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     console.log("Product deleted:", deletedProduct);
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// });


// (May 20)
router.delete("/", async (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("Product deleted:", deletedProduct);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});


router.get("/trending", async (req, res) => {
  try {
    // Logic to determine trending items, e.g., based on most viewed or added to cart
    const trendingItems = await Product.find({
      /* criteria for trending items */
    });

    res.status(200).json(trendingItems);
  } catch (err) {
    console.error("Error fetching trending items:", err);
    res.status(500).json({ error: "Failed to fetch trending items" });
  }
});

router.get("/most-sold", async (req, res) => {
  try {
    const mostSoldItems = await Product.find().sort({ sold: -1 }).limit(10);

    res.status(200).json(mostSoldItems);
  } catch (err) {
    console.error("Error fetching most sold items:", err);
    res.status(500).json({ error: "Failed to fetch most sold items" });
  }
});

// (Before May 20)
// router.patch("/updatestatus/:id", async (req, res) => {
//   try {
//     const { status } = req.body; // Expecting the new status from the frontend
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { status: status },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// (May 20)
router.patch("/updatestatus", async (req, res) => {
  try {
    const productId = req.query.id;
    const { status } = req.body; // Expecting the new status from the frontend
    
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: status },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/approved/xx", async (req, res) => {
  try {
    // Query the database for products with status 'approved'
    const approvedProducts = await Product.find({ status: "approved" });

    if (approvedProducts.length === 0) {
      return res.status(404).json({ message: "No approved products found" });
    }

    // Respond with the approved products
    res.status(200).json(approvedProducts);
  } catch (err) {
    console.error("Error fetching approved products:", err);
    res.status(500).json({ error: "Failed to fetch approved products" });
  }
});

// (Before May 20)
// router.get("/category/:categoryName", async (req, res) => {
//   const categoryName = req.params.categoryName.toLowerCase(); // Convert to lowercase
//   try {
//     const products = await Product.find({ category: categoryName });
//     if (products.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No products found in this category." });
//     }
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("Error fetching products by category:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });


// (May 20)
router.get("/category", async (req, res) => {
  const categoryName = req.query.name?.toLowerCase(); // Use query param
  const subCategory = req.query.subCategory;

  if (!categoryName) {
    return res.status(400).json({ error: "Category name is required." });
  }

  const query = { category: categoryName };
  if (subCategory) {
    query.subCategory = subCategory;
  }

  try {
    const products = await Product.find(query);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category." });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


// (Before May 20)
// router.patch("/remarks/:id", async (req, res) => {
//   const { id } = req.params;
//   const { remarks } = req.body;

//   try {
//     const product = await Product.findByIdAndUpdate(
//       id,
//       { remarks },
//       { new: true }
//     );
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating remarks", error });
//   }
// });

// (May 20)
router.patch("/remarks", async (req, res) => {
  const id = req.query.id;
  const { remarks } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { remarks },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating remarks", error });
  }
});

router.get("/search", async (req, res) => {
  const { query } = req.query; // Get the query string from the request

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query is required." }); // Return error if no query is provided
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search for product name
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search for product description
      ],
    });

    if (products.length === 0) {
      return res
        .status(200)
        .json({
          message: "No products found matching your search.",
          products: [],
        }); // Return an empty result with a message
    }

    res.status(200).json(products); // Return the list of products found
  } catch (err) {
    console.error("Error searching for products:", err);
    res.status(500).json({ error: "Failed to search products" });
  }
});

// Utility function to shuffle products
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Route to get random products
router.get("/all/random", async (req, res) => {
  try {
    const allProducts = await Product.find({status: "approved"});
    const shuffledProducts = shuffleArray(allProducts);
    res.status(200).json(shuffledProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to get average rating
// router.get("/:productId/average-rating", async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const reviews = await Review.find({ productId });

//     if (reviews.length === 0) {
//       return res.status(200).json({ averageRating: 0 });
//     }

//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const averageRating = (totalRating / reviews.length).toFixed(1); // 1 decimal point

//     res.status(200).json({ averageRating });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error fetching reviews" });
//   }
// });


router.get("/average-rating", async (req, res) => {
  const { productId } = req.query;

  try {
    const reviews = await Review.find({ productId });

    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);

    res.status(200).json({ averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Fetch products by subCategory only
router.get("/subcategory", async (req, res) => {
  const subCategory = req.query.name;
  if (!subCategory) {
    return res.status(400).json({ error: "Sub-category name is required." });
  }
  try {
    const products = await Product.find({ subCategory: subCategory });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this sub-category." });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by sub-category:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;

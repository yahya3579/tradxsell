const express = require('express');
const router = express.Router();
const Product = require('../Schemas/ProductSchema');
const Order = require('../Schemas/OrderSchema');
const Review = require('../Schemas/ReviewsSchema');
const SellerProfile = require('../Schemas/Seller');
const SellerInfo = require('../Schemas/SellerInfo');
const User = require('../Schemas/UserSchema');
const multer = require('multer');
const { cloudinary } = require('../utils/cloudinary');

// Use memory storage for multer (for logo upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Update or create seller profile (Cloudinary for logo only)
router.post('/profile', upload.single('logo'), async (req, res) => {
  try {
    // You should get userId from authentication middleware (e.g., req.user._id)
    // For demo, get from req.body.userId
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const {
      companyName,
      businessType,
      description,
      bio,
      phoneNumber,
      officeAddress,
      warehouseAddress,
      monthlySales,
      facebook,
      instagram,
      linkedin,
      legalDocs,   // Expecting these as JSON stringified arrays or comma-separated
      cnicDocs     // Same as above
    } = req.body;

    // Validation: companyName is required
    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({ error: 'Company name is required' });
    }

    // Upload logo to Cloudinary if present
    let profileImageUrl;
    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'seller_logos', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            profileImageUrl = result.secure_url;
            resolve();
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // Parse legalDocs and cnicDocs if sent as JSON strings
    let legalDocsArr = [];
    let cnicDocsArr = [];
    try {
      if (legalDocs) legalDocsArr = JSON.parse(legalDocs);
      if (cnicDocs) cnicDocsArr = JSON.parse(cnicDocs);
    } catch (e) {
      // fallback: treat as comma-separated
      if (legalDocs) legalDocsArr = legalDocs.split(',');
      if (cnicDocs) cnicDocsArr = cnicDocs.split(',');
    }

    // Build update object
    const update = {
      companyName,
      businessType,
      description,
      bio,
      phoneNumber,
      officeAddress,
      warehouseAddress,
      monthlySales,
      socialLinks: { facebook, instagram, linkedin },
      legalDocuments: legalDocsArr,
      cnicDocuments: cnicDocsArr
    };

    if (profileImageUrl) update.profileImageUrl = profileImageUrl;

    // Update or create the seller profile
    const seller = await SellerProfile.findOneAndUpdate(
      { user: userId },
      { $set: update },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Seller profile updated', seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating seller profile' });
  }
});

// Fetch seller profile by userId
router.get('/profile', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });
    const seller = await SellerProfile.findOne({ user: userId });
    if (!seller) return res.status(404).json({ error: 'Seller profile not found' });
    res.json({ seller });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching seller profile' });
  }
});

// Fetch recent reviews for a seller's products(Before 20 May)
// router.get('/recent-reviews/:sellerEmail', async (req, res) => {
//   try {
//     const products = await Product.find({ sellerEmail: req.params.sellerEmail });
    
//     const productIds = products.map(product => product.id);
    
//     // Fetch recent reviews, limit to the latest 5
//     const reviews = await Review.find({ productId : productIds})
//       .sort({ createdAt: -1 }) // Sort by created date in descending order
//       .limit(5); // Limit to the latest 5 reviews

//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching recent reviews for the seller' });
//     }
//   });

// Fetch recent reviews for a seller's products(20 May)
router.get('/recent-reviews', async (req, res) => {
  try {
    const sellerEmail = req.query.email;
    
    if (!sellerEmail) {
      return res.status(400).json({ error: 'Seller email is required' });
    }

    const products = await Product.find({ sellerEmail: sellerEmail });
    
    const productIds = products.map(product => product.id);
    
    // Fetch recent reviews, limit to the latest 5
    const reviews = await Review.find({ productId : productIds})
      .sort({ createdAt: -1 }) // Sort by created date in descending order
      .limit(5); // Limit to the latest 5 reviews

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recent reviews for the seller' });
  }
});

// Get recent reviews for seller by email (for Feedback component)
router.get('/recent-reviews', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Seller email is required as a query parameter, e.g. /seller/recent-reviews?email=seller@email.com' });
    }

    // Find all products by this seller
    const products = await Product.find({ sellerEmail: email });
    const productIds = products.map(product => product.id);
    const mongoIds = products.map(product => product._id.toString());
    const allIds = [...productIds, ...mongoIds];

    if (allIds.length === 0) {
      return res.json([]); // Return empty array if no products
    }

    // Find all reviews for these products
    const reviews = await Review.find({
      productId: { $in: allIds }
    }).sort({ createdAt: -1 }); // Sort by newest first

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching recent reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch total number of products by a seller (Before 20 May)
// router.get('/total-products/:sellerEmail', async (req, res) => {
//   try {
//     const count = await Product.countDocuments({ sellerEmail: req.params.sellerEmail });
//     res.status(200).json({ totalProducts: count });
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: 'Error fetching product count for the seller' });
//   }
// });

// Fetch total number of products by a seller(20 May)
router.get('/total-products', async (req, res) => {
  try {
    const sellerEmail = req.query.email;
    
    if (!sellerEmail) {
      return res.status(400).json({ error: 'Seller email is required' });
    }
    
    const count = await Product.countDocuments({ sellerEmail: sellerEmail });
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching product count for the seller' });
  }
});

// Fetch total number of orders related to the seller's products(Before 20 May)
// router.get('/total-orders/:sellerEmail', async (req, res) => {
//   try {
//     const products = await Product.find({ sellerEmail: req.params.sellerEmail });
//     const productIds = products.map(product => product.id); // Use _id for consistency
    
//     const count = await Order.countDocuments({ items: { $elemMatch: { productId: { $in: productIds } } } });
//     res.status(200).json({ totalOrders: count });
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: 'Error fetching order count for the seller' });
//   }
// });

// Fetch total number of orders related to the seller's products(20 May)
router.get('/total-orders', async (req, res) => {
  try {
    const sellerEmail = req.query.email; // Get email from query parameter
    
    if (!sellerEmail) {
      return res.status(400).json({ error: 'Seller email is required' });
    }
    
    const products = await Product.find({ sellerEmail: sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency
    
    const count = await Order.countDocuments({ items: { $elemMatch: { productId: { $in: productIds } } } });
    res.status(200).json({ totalOrders: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching order count for the seller' });
  }
});


// Fetch total number of reviews for the seller's products(Before 20 May)
// router.get('/total-reviews/:sellerEmail', async (req, res) => {
//   try {
//     const products = await Product.find({ sellerEmail: req.params.sellerEmail });
//     const productIds = products.map(product => product.id); // Use _id for consistency
    
//     const count = await Review.countDocuments({ productId: { $in: productIds } });
//     res.status(200).json({ totalReviews: count });
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: 'Error fetching review count for the seller' });
//   }
// });

// Fetch total number of reviews for the seller's products(20 May)
router.get('/total-reviews', async (req, res) => {
  try {
    const sellerEmail = req.query.email; // Get email from query parameter
    
    if (!sellerEmail) {
      return res.status(400).json({ error: 'Seller email is required' });
    }
    
    const products = await Product.find({ sellerEmail: sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency
    
    const count = await Review.countDocuments({ productId: { $in: productIds } });
    res.status(200).json({ totalReviews: count });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching review count for the seller' });
  }
});



// Fetch daily orders for the current month(Before 20 May)
// router.get('/daily-orders/:sellerEmail', async (req, res) => {
//   try {
//     const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of the current month
//     const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59); // Last day of the current month

//     // Modify to filter orders by products of the seller
//     const products = await Product.find({ sellerEmail: req.params.sellerEmail });
//     const productIds = products.map(product => product.id); // Use _id for consistency

//     const orders = await Order.find({
//       'items.productId': { $in: productIds },
//       orderDate: {
//         $gte: startOfMonth,
//         $lt: endOfMonth,
//       },
//     });

//     // Initialize an array for each day of the month (1-indexed for days)
//     const dailyOrderCount = Array.from({ length: 31 }, () => 0); // Default to 0 for 31 days

//     // Count orders for each day
//     orders.forEach(order => {
//       const day = order.orderDate.getDate(); // Get the day of the order date
//       if (day >= 1 && day <= 31) {
//         dailyOrderCount[day - 1]++; // Increment count for the respective day
//       }
//     });

//     // Return daily order counts
//     res.status(200).json(dailyOrderCount);
//   } catch (error) {
//     console.error(error); // Log the error
//     res.status(500).json({ error: 'Error fetching daily order counts' });
//   }
// });


// Fetch daily orders for the current month(20 May)
router.get('/daily-orders', async (req, res) => {
  try {
    const sellerEmail = req.query.email; // Get email from query parameter
    
    if (!sellerEmail) {
      return res.status(400).json({ error: 'Seller email is required' });
    }
    
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of the current month
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59); // Last day of the current month

    // Modify to filter orders by products of the seller
    const products = await Product.find({ sellerEmail: sellerEmail });
    const productIds = products.map(product => product.id); // Use _id for consistency

    const orders = await Order.find({
      'items.productId': { $in: productIds },
      orderDate: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    // Initialize an array for each day of the month (1-indexed for days)
    const dailyOrderCount = Array.from({ length: 31 }, () => 0); // Default to 0 for 31 days

    // Count orders for each day
    orders.forEach(order => {
      const day = order.orderDate.getDate(); // Get the day of the order date
      if (day >= 1 && day <= 31) {
        dailyOrderCount[day - 1]++; // Increment count for the respective day
      }
    });

    // Return daily order counts
    res.status(200).json(dailyOrderCount);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Error fetching daily order counts' });
  }
});

// Get public seller profile by email (for customer viewing)
router.get('/public-profile', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Seller not found' });

    // Find seller profile info
    let sellerInfo = await SellerInfo.findOne({ user: user._id });
    
    // If no SellerInfo exists, check old SellerProfile
    if (!sellerInfo) {
      const oldProfile = await SellerProfile.findOne({ user: user._id });
      if (oldProfile) {
        // Only show if isPublic is true
        if (!oldProfile.isPublic) {
          return res.status(404).json({ error: 'Public seller profile not found' });
        }
        // Map old profile to new format for backward compatibility
        sellerInfo = {
          companyName: oldProfile.companyName,
          businessType: oldProfile.businessType,
          description: oldProfile.description,
          bio: oldProfile.bio,
          contactInfo: {
            email: email,
            phone: oldProfile.phoneNumber
          },
          addresses: {
            office: oldProfile.officeAddress,
            warehouse: oldProfile.warehouseAddress
          },
          socialLinks: oldProfile.socialLinks,
          profilePicture: oldProfile.profileImageUrl ? {
            url: oldProfile.profileImageUrl,
            format: 'jpg', // Default
            size: 0
          } : null,
          profileStatus: { isPublic: true },
          tags: oldProfile.tags || []
        };
      }
    } else {
      // If using SellerInfo, try to include tags from SellerProfile if available
      const oldProfile = await SellerProfile.findOne({ user: user._id });
      sellerInfo = sellerInfo.toObject();
      sellerInfo.tags = oldProfile && oldProfile.tags ? oldProfile.tags : [];
      // Only show if isPublic is true in SellerProfile
      if (!oldProfile || !oldProfile.isPublic) {
        return res.status(404).json({ error: 'Public seller profile not found' });
      }
    }

    if (!sellerInfo || !sellerInfo.profileStatus?.isPublic) {
      return res.status(404).json({ error: 'Public seller profile not found' });
    }

    // Increment profile views
    if (sellerInfo.incrementViews) {
      await sellerInfo.incrementViews();
    }

    res.json({ seller: sellerInfo });
  } catch (error) {
    console.error('Error fetching public seller profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload and validate profile picture
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    if (!req.file) return res.status(400).json({ error: 'Profile picture is required' });

    // Validate image format and size
    const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (req.file.size > maxSize) {
      return res.status(400).json({ error: 'Profile picture must be less than 5MB' });
    }

    // Upload to Cloudinary with validation
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'seller_profile_pictures',
          resource_type: 'image',
          format: 'auto',
          quality: 'auto:good',
          width: 400,
          height: 400,
          crop: 'fill',
          gravity: 'face'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Create/update seller info with validated image
    const imageData = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      size: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height
    };

    let sellerInfo = await SellerInfo.findOne({ user: userId });
    if (sellerInfo) {
      sellerInfo.profilePicture = imageData;
      await sellerInfo.save();
    } else {
      // Create basic profile if doesn't exist
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      sellerInfo = new SellerInfo({
        user: userId,
        companyName: user.username || 'My Company',
        businessType: 'retailer',
        description: 'Welcome to our store!',
        contactInfo: {
          email: user.email,
          phone: '000-000-0000'
        },
        addresses: {
          office: 'Not specified'
        },
        profilePicture: imageData
      });
      await sellerInfo.save();
    }

    res.json({ 
      message: 'Profile picture uploaded successfully',
      profilePicture: imageData
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
});

// Update public seller information
router.put('/update-public-info', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    // Validate social media URLs if provided
    const socialValidations = {
      facebook: /^https?:\/\/(www\.)?facebook\.com\//,
      instagram: /^https?:\/\/(www\.)?instagram\.com\//,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\//,
      twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\//
    };

    if (updateData.socialLinks) {
      for (const [platform, url] of Object.entries(updateData.socialLinks)) {
        if (url && socialValidations[platform] && !socialValidations[platform].test(url)) {
          return res.status(400).json({ 
            error: `Invalid ${platform} URL format` 
          });
        }
      }
    }

    // Update seller info
    const sellerInfo = await SellerInfo.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.json({ 
      message: 'Public profile updated successfully',
      seller: sellerInfo
    });
  } catch (error) {
    console.error('Error updating public seller info:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get seller profile analytics
router.get('/analytics', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const sellerInfo = await SellerInfo.findOne({ user: userId });
    if (!sellerInfo) return res.status(404).json({ error: 'Seller profile not found' });

    const analytics = {
      profileViews: sellerInfo.analytics.profileViews,
      profileCompleteness: sellerInfo.profileCompleteness,
      lastUpdate: sellerInfo.analytics.lastProfileUpdate,
      isPublic: sellerInfo.profileStatus.isPublic,
      isVerified: sellerInfo.profileStatus.isVerified,
      verificationLevel: sellerInfo.profileStatus.verificationLevel
    };

    res.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Validate image format and size (utility endpoint for frontend validation)
router.post('/validate-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });

    const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const fileExtension = req.file.mimetype.split('/')[1];

    const validation = {
      isValidFormat: allowedFormats.includes(fileExtension),
      isValidSize: req.file.size <= maxSize,
      format: fileExtension,
      size: req.file.size,
      sizeInMB: (req.file.size / (1024 * 1024)).toFixed(2)
    };

    if (!validation.isValidFormat) {
      return res.status(400).json({
        error: 'Invalid image format. Allowed formats: JPG, JPEG, PNG, WebP',
        validation
      });
    }

    if (!validation.isValidSize) {
      return res.status(400).json({
        error: 'Image size too large. Maximum size: 5MB',
        validation
      });
    }

    res.json({
      message: 'Image validation successful',
      validation
    });
  } catch (error) {
    console.error('Error validating image:', error);
    res.status(500).json({ error: 'Failed to validate image' });
  }
});

// Admin: Update seller tags and role
router.put('/admin/update-tags-role', async (req, res) => {
  try {
    const { userId, tags, role } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    // Only set isPublic: true if tags is a non-empty array
    const updateFields = { tags };
    if (Array.isArray(tags) && tags.length > 0) {
      updateFields.isPublic = true;
    }

    // Update SellerProfile tags and isPublic
    const seller = await SellerProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateFields },
      { new: true }
    );

    // Update User role if provided
    if (role) {
      await User.findByIdAndUpdate(userId, { $set: { role } });
    }

    res.json({ message: 'Tags and role updated', seller });
  } catch (error) {
    console.error('Error updating tags/role:', error);
    res.status(500).json({ error: 'Failed to update tags/role' });
  }
});

module.exports = router;

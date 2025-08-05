const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../Schemas/ProductSchema');
const Order = require('../Schemas/OrderSchema');
const Review = require('../Schemas/ReviewsSchema');
const SellerProfile = require('../Schemas/Seller');
const SellerInfo = require('../Schemas/SellerInfo');
const User = require('../Schemas/UserSchema');
const multer = require('multer');
const { cloudinary } = require('../utils/cloudinary');

// Use memory storage for multer (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WEBP images and PDFs are allowed."), false);
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.error('❌ Multer error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files uploaded.' });
    }
    return res.status(400).json({ error: 'File upload error: ' + error.message });
  }
  
  if (error) {
    console.error('❌ Upload error:', error);
    return res.status(400).json({ error: error.message });
  }
  
  next();
};

// Update or create seller profile (Cloudinary for all files)
router.post('/profile', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'legalDocs', maxCount: 5 },
  { name: 'cnicDocs', maxCount: 2 }
]), handleMulterError, async (req, res) => {
  try {
    console.log('🔍 Seller profile update request received');
    console.log('📁 Files received:', req.files ? Object.keys(req.files) : 'No files');
    console.log('📝 Body data:', Object.keys(req.body));
    
    // You should get userId from authentication middleware (e.g., req.user._id)
    // For demo, get from req.body.userId
    const userId = req.body.userId;
    if (!userId) {
      console.log('❌ User ID missing');
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('👤 User ID:', userId);

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
      linkedin
    } = req.body;

    // Validation: companyName is required
    if (!companyName || companyName.trim() === "") {
      console.log('❌ Company name missing');
      return res.status(400).json({ error: 'Company name is required' });
    }

    console.log('🏢 Company name:', companyName);

    // Upload logo to Cloudinary if present
    let profileImageUrl;
    if (req.files && req.files.logo && req.files.logo[0]) {
      console.log('📸 Uploading logo to Cloudinary...');
      const logoFile = req.files.logo[0];
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: 'seller_logos', 
            resource_type: 'image',
            transformation: [{ width: 400, height: 400, crop: 'fill' }]
          },
          (error, result) => {
            if (error) {
              console.error('❌ Logo upload error:', error);
              reject(error);
            } else {
              console.log('✅ Logo uploaded successfully');
              profileImageUrl = result.secure_url;
              resolve();
            }
          }
        );
        stream.end(logoFile.buffer);
      });
    }

    // Upload legal documents to Cloudinary
    let legalDocsArr = [];
    if (req.files && req.files.legalDocs) {
      console.log(`📄 Uploading ${req.files.legalDocs.length} legal documents...`);
      for (const file of req.files.legalDocs) {
        await new Promise((resolve, reject) => {
          const uploadOptions = {
            folder: 'seller_legal_docs',
            resource_type: file.mimetype.startsWith('image/') ? 'image' : 'raw'
          };
          
          // Only add transformation for images
          if (file.mimetype.startsWith('image/')) {
            uploadOptions.transformation = [{ width: 800, height: 800, crop: 'limit' }];
          }
          
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) {
                console.error('❌ Legal doc upload error:', error);
                reject(error);
              } else {
                console.log('✅ Legal doc uploaded:', file.originalname);
                legalDocsArr.push({
                  url: result.secure_url,
                  public_id: result.public_id,
                  type: file.mimetype,
                  name: file.originalname
                });
                resolve();
              }
            }
          );
          stream.end(file.buffer);
        });
      }
    }

    // Upload CNIC documents to Cloudinary
    let cnicDocsArr = [];
    if (req.files && req.files.cnicDocs) {
      console.log(`🆔 Uploading ${req.files.cnicDocs.length} CNIC documents...`);
      for (const file of req.files.cnicDocs) {
        await new Promise((resolve, reject) => {
          const uploadOptions = {
            folder: 'seller_cnic_docs',
            resource_type: file.mimetype.startsWith('image/') ? 'image' : 'raw'
          };
          
          // Only add transformation for images
          if (file.mimetype.startsWith('image/')) {
            uploadOptions.transformation = [{ width: 800, height: 800, crop: 'limit' }];
          }
          
          const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) {
                console.error('❌ CNIC doc upload error:', error);
                reject(error);
              } else {
                console.log('✅ CNIC doc uploaded:', file.originalname);
                cnicDocsArr.push({
                  url: result.secure_url,
                  public_id: result.public_id,
                  type: file.mimetype,
                  name: file.originalname
                });
                resolve();
              }
            }
          );
          stream.end(file.buffer);
        });
      }
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

    console.log('💾 Updating seller profile in database...');

    // Update or create the seller profile
    const seller = await SellerProfile.findOneAndUpdate(
      { user: userId },
      { $set: update },
      { new: true, upsert: true }
    );

    console.log('✅ Seller profile updated successfully');
    res.status(200).json({ message: 'Seller profile updated', seller });
  } catch (error) {
    console.error('❌ Error updating seller profile:', error);
    res.status(500).json({ error: 'Error updating seller profile', details: error.message });
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
    console.log(`DEBUG: Found ${products.length} products for seller ${email}`);
    console.log('DEBUG: Products:', products.map(p => ({ id: p.id, _id: p._id.toString(), name: p.name })));
    
    // Collect both id and _id for each product to match reviews
    const allProductIds = [];
    products.forEach(product => {
      if (product.id) allProductIds.push(product.id);
      if (product._id) allProductIds.push(product._id.toString());
    });
    console.log('DEBUG: All product IDs to search for:', allProductIds);

    if (allProductIds.length === 0) {
      console.log('DEBUG: No product IDs found, returning empty array');
      return res.json([]); // Return empty array if no products
    }

    // Find all reviews for these products (matching either id or _id)
    // Search for both string and ObjectId versions
    const reviews = await Review.find({
      $or: [
        { productId: { $in: allProductIds } }, // String version
        { productId: { $in: allProductIds.map(id => new mongoose.Types.ObjectId(id)) } } // ObjectId version
      ]
    }).sort({ createdAt: -1 }); // Sort by newest first
    
    console.log(`DEBUG: Found ${reviews.length} reviews`);
    console.log('DEBUG: Reviews:', reviews.map(r => ({ productId: r.productId, username: r.username, review: r.review })));

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

// Get all orders for a seller
router.get('/orders', async (req, res) => {
  try {
    const sellerEmail = req.query.email;
    if (!sellerEmail) return res.status(400).json({ error: 'Seller email is required' });
    const products = await Product.find({ sellerEmail });
    const productIds = products.map(p => p.id);
    // Find all orders that contain any of the seller's products
    const orders = await Order.find({ 'items.productId': { $in: productIds } }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller orders' });
  }
});

// Get seller stats (total sales, total orders, average order value this month)
router.get('/stats', async (req, res) => {
  try {
    const sellerEmail = req.query.email;
    if (!sellerEmail) return res.status(400).json({ error: 'Seller email is required' });
    const products = await Product.find({ sellerEmail });
    const productIds = products.map(p => p.id);
    // Find all orders for this seller
    const orders = await Order.find({ 'items.productId': { $in: productIds } });
    // Total sales amount
    let totalSalesAmount = 0;
    let totalOrders = 0;
    let thisMonthSales = 0;
    let thisMonthOrders = 0;
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    orders.forEach(order => {
      let orderTotal = 0;
      order.items.forEach(item => {
        if (productIds.includes(item.productId)) {
          orderTotal += (item.price || 0) * (item.quantity || 1);
        }
      });
      totalSalesAmount += orderTotal;
      // Check if order is from this month
      const orderDate = order.createdAt || order.orderDate;
      if (orderDate && new Date(orderDate).getMonth() === thisMonth && new Date(orderDate).getFullYear() === thisYear) {
        thisMonthSales += orderTotal;
        thisMonthOrders += 1;
      }
      totalOrders += 1;
    });
    const averageOrderValueThisMonth = thisMonthOrders > 0 ? (thisMonthSales / thisMonthOrders) : 0;
    res.json({ totalSalesAmount, totalOrders, averageOrderValueThisMonth });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller stats' });
  }
});

// Get top 3 selling products for a seller
router.get('/top-products', async (req, res) => {
  try {
    const sellerEmail = req.query.email;
    if (!sellerEmail) return res.status(400).json({ error: 'Seller email is required' });
    const products = await Product.find({ sellerEmail });
    const productIds = products.map(p => p.id);
    // Find all orders for this seller
    const orders = await Order.find({ 'items.productId': { $in: productIds } });
    // Aggregate sales by productId
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (productIds.includes(item.productId)) {
          if (!productSales[item.productId]) {
            productSales[item.productId] = { quantity: 0, revenue: 0, product: null };
          }
          productSales[item.productId].quantity += (item.quantity || 1);
          productSales[item.productId].revenue += (item.price || 0) * (item.quantity || 1);
        }
      });
    });
    // Attach product info
    for (const pid of Object.keys(productSales)) {
      productSales[pid].product = products.find(p => p.id === pid);
    }
    // Sort by quantity sold
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top products' });
  }
});

// Delete file from Cloudinary and database
router.delete('/delete-file', async (req, res) => {
  try {
    const { userId, fileType, publicId } = req.body;
    
    if (!userId || !fileType || !publicId) {
      return res.status(400).json({ error: 'User ID, file type, and public ID are required' });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
    } catch (cloudinaryError) {
      console.error('Cloudinary deletion error:', cloudinaryError);
      // Continue with database update even if Cloudinary deletion fails
    }

    // Remove from database
    const updateField = fileType === 'legal' ? 'legalDocuments' : 'cnicDocuments';
    const seller = await SellerProfile.findOneAndUpdate(
      { user: userId },
      { $pull: { [updateField]: { public_id: publicId } } },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ error: 'Seller profile not found' });
    }

    res.json({ message: 'File deleted successfully', seller });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Test route to check Cloudinary configuration
router.get('/test-cloudinary', async (req, res) => {
  try {
    console.log('🔍 Testing Cloudinary configuration...');
    console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set');
    console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
    console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
    
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ 
        error: 'Cloudinary environment variables not configured',
        cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: !!process.env.CLOUDINARY_API_KEY,
        apiSecret: !!process.env.CLOUDINARY_API_SECRET
      });
    }
    
    // Test Cloudinary connection
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary test result:', result);
    
    res.json({ 
      message: 'Cloudinary configuration is working',
      status: 'ok',
      cloudinary: result
    });
  } catch (error) {
    console.error('❌ Cloudinary test error:', error);
    res.status(500).json({ 
      error: 'Cloudinary configuration error',
      details: error.message
    });
  }
});

module.exports = router;

const mongoose = require("mongoose");

// Schema for validated image uploads
const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String }, // Cloudinary public ID
    format: { 
      type: String, 
      enum: ['jpg', 'jpeg', 'png', 'webp'],
      required: true 
    },
    size: { 
      type: Number, 
      max: 5000000, // 5MB max
      required: true 
    },
    width: { type: Number },
    height: { type: Number },
    uploadedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

// Enhanced seller info schema with image validation
const sellerInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Profile Information
    profilePicture: {
      type: imageSchema,
      validate: {
        validator: function(pic) {
          if (!pic) return true; // Optional field
          return ['jpg', 'jpeg', 'png', 'webp'].includes(pic.format.toLowerCase());
        },
        message: 'Profile picture must be in JPG, JPEG, PNG, or WebP format'
      }
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    businessType: {
      type: String,
      enum: ["manufacturer", "supplier", "wholeseller", "distributor", "retailer"],
      required: true,
    },

    description: {
      type: String,
      maxlength: 1000,
      required: true
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    // Contact Information
    contactInfo: {
      email: { 
        type: String, 
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      phone: { 
        type: String, 
        required: true,
        match: /^[0-9+\-\s()]+$/
      },
      website: { 
        type: String,
        validate: {
          validator: function(url) {
            if (!url) return true;
            return /^https?:\/\/.+/.test(url);
          },
          message: 'Website must be a valid URL starting with http:// or https://'
        }
      }
    },

    // Address Information
    addresses: {
      office: { type: String, required: true },
      warehouse: { type: String },
      showroom: { type: String }
    },

    // Social Media Links
    socialLinks: {
      facebook: { 
        type: String,
        validate: {
          validator: function(url) {
            if (!url) return true;
            return /^https?:\/\/(www\.)?facebook\.com\//.test(url);
          },
          message: 'Facebook URL must be a valid Facebook profile/page URL'
        }
      },
      instagram: { 
        type: String,
        validate: {
          validator: function(url) {
            if (!url) return true;
            return /^https?:\/\/(www\.)?instagram\.com\//.test(url);
          },
          message: 'Instagram URL must be a valid Instagram profile URL'
        }
      },
      linkedin: { 
        type: String,
        validate: {
          validator: function(url) {
            if (!url) return true;
            return /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
          },
          message: 'LinkedIn URL must be a valid LinkedIn profile/company URL'
        }
      },
      twitter: { 
        type: String,
        validate: {
          validator: function(url) {
            if (!url) return true;
            return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\//.test(url);
          },
          message: 'Twitter URL must be a valid Twitter/X profile URL'
        }
      }
    },

    // Business Metrics
    businessMetrics: {
      yearsInBusiness: { 
        type: Number, 
        min: 0, 
        max: 100 
      },
      employeeCount: { 
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500+']
      },
      annualRevenue: { 
        type: String,
        enum: ['<$100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M+']
      },
      servingRegions: [{ 
        type: String,
        maxlength: 50
      }]
    },

    // Profile Status and Verification
    profileStatus: {
      isPublic: { type: Boolean, default: true },
      isVerified: { type: Boolean, default: false },
      verificationDate: { type: Date },
      verificationLevel: {
        type: String,
        enum: ['basic', 'verified', 'premium'],
        default: 'basic'
      }
    },

    // Profile Views and Analytics
    analytics: {
      profileViews: { type: Number, default: 0 },
      lastProfileUpdate: { type: Date, default: Date.now },
      featuredUntil: { type: Date }, // For premium/featured listings
    },

    // Tags and Categories
    tags: [{ 
      type: String,
      maxlength: 30
    }],

    specializations: [{ 
      type: String,
      maxlength: 50
    }],

    // Image Upload Feature Flags (as mentioned in screenshot)
    features: {
      profilePictureEnabled: { type: Boolean, default: true },
      imageFormatsValidated: { type: Boolean, default: true },
      imageSizeValidated: { type: Boolean, default: true },
      isDeliverable: { type: Boolean, default: true }, // Mentioned in screenshot
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for profile completion percentage
sellerInfoSchema.virtual('profileCompleteness').get(function() {
  let completeness = 0;
  const totalFields = 10;
  
  if (this.profilePicture) completeness += 1;
  if (this.companyName) completeness += 1;
  if (this.description) completeness += 1;
  if (this.contactInfo.phone) completeness += 1;
  if (this.addresses.office) completeness += 1;
  if (this.businessType) completeness += 1;
  if (this.businessMetrics.yearsInBusiness) completeness += 1;
  if (this.socialLinks.facebook || this.socialLinks.instagram || this.socialLinks.linkedin) completeness += 1;
  if (this.tags && this.tags.length > 0) completeness += 1;
  if (this.specializations && this.specializations.length > 0) completeness += 1;
  
  return Math.round((completeness / totalFields) * 100);
});

// Index for search optimization
sellerInfoSchema.index({ 
  companyName: 'text', 
  description: 'text', 
  tags: 'text',
  specializations: 'text'
});

sellerInfoSchema.index({ 'contactInfo.email': 1 });
sellerInfoSchema.index({ 'profileStatus.isPublic': 1, 'profileStatus.isVerified': 1 });

// Pre-save middleware for image validation
sellerInfoSchema.pre('save', function(next) {
  if (this.profilePicture && this.profilePicture.size > 5000000) {
    return next(new Error('Profile picture size must be less than 5MB'));
  }
  
  this.analytics.lastProfileUpdate = new Date();
  next();
});

// Static method to find public profiles
sellerInfoSchema.statics.findPublicProfiles = function(options = {}) {
  const query = { 'profileStatus.isPublic': true };
  
  if (options.verified) {
    query['profileStatus.isVerified'] = true;
  }
  
  if (options.businessType) {
    query.businessType = options.businessType;
  }
  
  return this.find(query)
    .populate('user', 'username email')
    .sort({ 'analytics.profileViews': -1, updatedAt: -1 });
};

// Instance method to increment profile views
sellerInfoSchema.methods.incrementViews = function() {
  this.analytics.profileViews += 1;
  return this.save();
};

module.exports = mongoose.model("SellerInfo", sellerInfoSchema, "SellerInfo");
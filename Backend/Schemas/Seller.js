// // models/Seller.js
// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   url: String,
//   type: String, // image/jpeg, application/pdf etc.
//   name: String,
// });

// const sellerSchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   businessType: { type: String, required: true },
//   description: { type: String },
//   phoneNumber: { type: String, required: true },
//   officeAddress: { type: String, required: true },
//   warehouseAddress: { type: String },
//   sales: { type: Number, default: 0 },

//   profileImage: { type: String }, // Cloudinary URL (logo)

//   legalDocuments: [fileSchema], // Array of uploaded files
//   cnicDocuments: [fileSchema], // Front and back CNIC uploads

//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Seller", sellerSchema);



const mongoose = require("mongoose");
const slugify = require("slugify");

// Reusable schema for file uploads
const fileSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String },
    type: { type: String },
    name: { type: String },
  },
  { _id: false }
);

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    storeSlug: {
      type: String,
      unique: true,
      required: true,
    },

    businessType: {
      type: String,
      enum: ["manufacturer", "supplier", "wholeseller", "distributor", "retailer"],
      required: true,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10,15}$/,
    },

    officeAddress: {
      type: String,
      required: true,
    },

    warehouseAddress: {
      type: String,
    },

    monthlySales: {
      type: Number,
      default: 0,
    },

    profileImageUrl: {
      type: String,
    },

    legalDocuments: [fileSchema],
    cnicDocuments: [fileSchema],

    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tags: {
      type: [String],
      enum: ["registered", "verified", "gold"],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔧 Auto-generate storeSlug from companyName
sellerSchema.pre("validate", async function (next) {
  if (this.companyName && (!this.storeSlug || this.storeSlug === null)) {
    const slugify = require("slugify");
    let baseSlug = slugify(this.companyName, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    // Only check for uniqueness if the slug is new or companyName changed
    while (await this.constructor.findOne({ storeSlug: slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${count++}`;
    }
    this.storeSlug = slug;
  }
  next();
});

// 🔧 Ensure storeSlug is always set before saving
sellerSchema.pre("save", async function (next) {
  if (this.companyName && (!this.storeSlug || this.storeSlug === null)) {
    const slugify = require("slugify");
    let baseSlug = slugify(this.companyName, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    // Check for uniqueness
    while (await this.constructor.findOne({ storeSlug: slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${count++}`;
    }
    this.storeSlug = slug;
  }
  next();
});

// Export model with collection name "SellerProfile"
module.exports = mongoose.model("SellerProfile", sellerSchema, "SellerProfile");

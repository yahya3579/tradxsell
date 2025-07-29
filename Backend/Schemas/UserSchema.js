const mongoose = require('mongoose')
const bcrypt = require('bcryptjs'); // Assuming you're using bcryptjs for password hashing
const crypto = require('crypto'); // Importing the crypto module

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: String,
    phoneNumber: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date
});


// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

// Generate verification token method
userSchema.methods.generateVerificationToken = function() {
    // Create a random token
    this.verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Set expiration (24 hours)
    // this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    // Set expiration (5 minutes)
    this.verificationTokenExpires = Date.now() + 5 * 60 * 1000;
    
    return this.verificationToken;
};

// Compound unique index: (email, role) must be unique
userSchema.index({ email: 1, role: 1 }, { unique: true });

// Create a Mongoose model
const User = mongoose.model('User', userSchema);
module.exports = User;

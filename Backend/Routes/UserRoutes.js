const express = require('express');
const User = require('../Schemas/UserSchema.js');
const { transporter } = require('../config/emailConfig.js');
// const { transactionalEmailApi } = require('../config/emailConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express.Router();

// Add new user
app.post('/addnew', async (req, res) => {
    const { username, email, password, address, phoneNumber, role, currRole } = req.body;
  
    try {
      
      if(currRole === 'user') {
          console.log(" user can make a seller account");
        }else{
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ error: 'User with this email already exists and is verified' });
        } else {
          return res.status(400).json({ error: 'User with this email already exists and is not verified' });
        }
      }
          }
  
      const newUser = new User({
        username,
        email,
        password,
        address,
        phoneNumber,
        role,
        isVerified: false
      });
  
      const verificationToken = newUser.generateVerificationToken();
  
      await newUser.save();
  
      const verificationUrl = `${process.env.FRONTEND_URL || 'https://tradxsell.com'}/verify-email/${verificationToken}`;
  
      try {
        await transporter.sendMail({
          from: '"Tradxsell" <support@tradxsell.com>',
          to: newUser.email,
          subject: 'Please verify your email',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification - Tradxsell</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f5f5f5;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                        padding: 30px 20px;
                        text-align: center;
                        color: white;
                    }
                    .logo {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .header-subtitle {
                        font-size: 16px;
                        opacity: 0.9;
                        margin: 0;
                    }
                    .content {
                        padding: 40px 30px;
                        text-align: center;
                    }
                    .welcome-text {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 20px;
                        font-weight: 600;
                    }
                    .description {
                        font-size: 16px;
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 30px;
                    }
                    .verify-button {
                        display: inline-block;
                        background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                        color: white;
                        text-decoration: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: 600;
                        margin: 20px 0;
                        box-shadow: 0 4px 15px rgba(239, 91, 43, 0.3);
                        transition: all 0.3s ease;
                    }
                    .verify-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(239, 91, 43, 0.4);
                    }
                    .footer {
                        background-color: #f8f9fa;
                        padding: 20px;
                        text-align: center;
                        color: #666;
                        font-size: 14px;
                    }
                    .warning {
                        background-color: #fff3cd;
                        border: 1px solid #ffeaa7;
                        border-radius: 5px;
                        padding: 15px;
                        margin: 20px 0;
                        color: #856404;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <div class="logo">🏪 Tradxsell</div>
                        <p class="header-subtitle">Your Trusted E-commerce Platform</p>
                    </div>
                    
                    <div class="content">
                        <h1 class="welcome-text">Welcome to Tradxsell, ${newUser.username}!</h1>
                        <p class="description">
                            Thank you for joining our community! To complete your registration and start exploring our marketplace, 
                            please verify your email address by clicking the button below.
                        </p>
                        
                        <a href="${verificationUrl}" class="verify-button">
                            ✅ Verify Email Address
                        </a>
                        
                        <div class="warning">
                            ⏰ This verification link will expire in 5 minutes for security reasons.
                        </div>
                        
                        <p class="description">
                            If you didn't create an account with Tradxsell, you can safely ignore this email.
                        </p>
                    </div>
                    
                    <div class="footer">
                        <p>© 2024 Tradxsell. All rights reserved.</p>
                        <p>This email was sent to ${newUser.email}</p>
                    </div>
                </div>
            </body>
            </html>
          `
        });
        console.log('Verification email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the registration if email fails, but log it
        // You might want to implement a retry mechanism or queue system
      }

      // await transactionalEmailApi.sendTransacEmail({
      //   sender: { email: 'support@tradxsell.com', name: 'Tradxsell' },
      //   to: [{ email: newUser.email, name: newUser.username }],
      //   subject: 'Please verify your email',
      //   htmlContent: `
      //     <h1>Email Verification</h1>
      //     <p>Hello ${newUser.username},</p>
      //     <p>Please verify your email by clicking the link below:</p>
      //     <a href="${verificationUrl}">Verify Email</a>
      //     <p>This link will expire in 5 minutes.</p>
      //   `
      // });
  
      console.log('User saved to database, verification email sent');
      return res.status(201).json({ message: 'User added successfully. Please check your email to verify your account.' }); 
    } catch (err) {
      console.error('Error saving user:', err);
      return res.status(500).json({ error: 'Failed to add user: ' + err.message });
    }
  });
  


// Email verification endpoint
app.get('/verify-email/:token', async (req, res) => {
  try {
      const { token } = req.params;
      
      // Find user with token
      const user = await User.findOne({
          verificationToken: token,
          verificationTokenExpires: { $gt: Date.now() }
      });
      
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired verification token' });
      }
      
      // Update user to verified
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      
      await user.save();
      
      res.status(200).json({ message: 'Email verified successfully. You can now login.' });
  } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password - request reset link (email only)
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If an account exists, an email has been sent' });
    // Optional: record request time window without tokens
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour window to reset
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'https://tradxsell.com'}/reset-password?email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: 'support@tradxsell.com',
      to: user.email,
      subject: 'Password Reset Instructions',
      html: `
        <div style="font-family:Segoe UI,Roboto,Arial,sans-serif">
          <h2>Reset your password</h2>
          <p>We received a request to reset your password. Click the button below to continue.</p>
          <p><a href="${resetUrl}" style="display:inline-block;background:#EF5B2B;color:#fff;padding:12px 18px;border-radius:6px;text-decoration:none">Reset Password</a></p>
          <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    return res.json({ message: 'If an account exists, an email has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Reset password - update by matching email only
app.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired reset request' });

    user.password = password; // will be hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

  
// Resend verification email
app.post('/resend-verification', async (req, res) => {
  try {
      const { email } = req.body;
      
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }
      
      // Check if already verified
      if (user.isVerified) {
          return res.status(400).json({ message: 'Email already verified' });
      }
      
      // Generate new verification token
      const verificationToken = user.generateVerificationToken();
      await user.save();
      
      // Create verification URL
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      
      // Send verification email
      await transporter.sendMail({
          from: '"Tradxsell" <support@tradxsell.com>',
          to: user.email,
          subject: 'Please verify your email',
          html: `
              <!DOCTYPE html>
              <html>
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verification - Tradxsell</title>
                  <style>
                      body {
                          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                          margin: 0;
                          padding: 0;
                          background-color: #f5f5f5;
                      }
                      .email-container {
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #ffffff;
                          border-radius: 10px;
                          overflow: hidden;
                          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                          background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                          padding: 30px 20px;
                          text-align: center;
                          color: white;
                      }
                      .logo {
                          font-size: 28px;
                          font-weight: bold;
                          margin-bottom: 10px;
                      }
                      .header-subtitle {
                          font-size: 16px;
                          opacity: 0.9;
                          margin: 0;
                      }
                      .content {
                          padding: 40px 30px;
                          text-align: center;
                      }
                      .welcome-text {
                          font-size: 24px;
                          color: #333;
                          margin-bottom: 20px;
                          font-weight: 600;
                      }
                      .description {
                          font-size: 16px;
                          color: #666;
                          line-height: 1.6;
                          margin-bottom: 30px;
                      }
                      .verify-button {
                          display: inline-block;
                          background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                          color: white;
                          text-decoration: none;
                          padding: 15px 30px;
                          border-radius: 25px;
                          font-size: 16px;
                          font-weight: 600;
                          margin: 20px 0;
                          box-shadow: 0 4px 15px rgba(239, 91, 43, 0.3);
                          transition: all 0.3s ease;
                      }
                      .verify-button:hover {
                          transform: translateY(-2px);
                          box-shadow: 0 6px 20px rgba(239, 91, 43, 0.4);
                      }
                      .footer {
                          background-color: #f8f9fa;
                          padding: 20px;
                          text-align: center;
                          color: #666;
                          font-size: 14px;
                      }
                      .warning {
                          background-color: #fff3cd;
                          border: 1px solid #ffeaa7;
                          border-radius: 5px;
                          padding: 15px;
                          margin: 20px 0;
                          color: #856404;
                          font-size: 14px;
                      }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="header">
                          <div class="logo">🏪 Tradxsell</div>
                          <p class="header-subtitle">Your Trusted E-commerce Platform</p>
                      </div>
                      
                      <div class="content">
                          <h1 class="welcome-text">Email Verification Required</h1>
                          <p class="description">
                              Hello ${user.username}! We noticed you haven't verified your email address yet. 
                              To access your Tradxsell account and start shopping, please verify your email by clicking the button below.
                          </p>
                          
                          <a href="${verificationUrl}" class="verify-button">
                              ✅ Verify Email Address
                          </a>
                          
                          <div class="warning">
                              ⏰ This verification link will expire in 5 minutes for security reasons.
                          </div>
                          
                          <p class="description">
                              If you didn't request this email, you can safely ignore it.
                          </p>
                      </div>
                      
                      <div class="footer">
                          <p>© 2024 Tradxsell. All rights reserved.</p>
                          <p>This email was sent to ${user.email}</p>
                      </div>
                  </div>
              </body>
              </html>
          `
      });


      // await transactionalEmailApi.sendTransacEmail({
      //   sender: { email: 'support@tradxsell.com', name: 'Tradxsell' },
      //   to: [{ email: user.email, name: user.username }],
      //   subject: 'Please verify your email',
      //   htmlContent: `
      //     <h1>Email Verification</h1>
      //     <p>Hello ${user.username},</p>
      //     <p>Please verify your email by clicking the link below:</p>
      //     <a href="${verificationUrl}">Verify Email</a>
      //     <p>This link will expire in 5 minutes.</p>
      //   `
      // });
      
      res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.put('/convert-to-seller', async (req, res) => {
    const {email}  = req.body;
    console.log(email);
   const updatedUser = User.findOneAndUpdate(
        { email },
        { $set: { role: 'seller' } },
        { new: true }, // Return the updated document
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
        })
        .catch((error) => {
            console.error('Error updating user role:', error);
            res.status(500).json({ message: 'Server error' });  
        });
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in',
        needsVerification: true
      });
    }

    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Login successful
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { email: user.email, username: user.username, role: user.role, id: user._id }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// (May 20)
app.get('/products/seller', async (req, res) => {
  const sellerEmail = req.query.email;

  if (!sellerEmail) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const seller = await User.findOne({ email: sellerEmail }); // Or Seller.findOne()
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.json(seller);
  } catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// (May 20)
  app.get('/user', async (req, res) => {
    const sellerEmail = req.query.email; // Get the sellerEmail from query parameters
    
    if (!sellerEmail) {
        return res.status(400).json({ message: 'Email is required' });
    }
    
    try {
      // Find the user in the database based on the sellerEmail
      const user = await User.findOne({ email: sellerEmail });
      
      if (!user) {
        // If no user is found, send a 404 response
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If user is found, return the user data as a JSON response
      res.json(user);
    } catch (error) {
      // In case of error, send a 500 response
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// (May 20)
app.get('/userdetails', async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


// (May 20)
app.put('/update', async (req, res) => {
  const id = req.query.id;
  const { username, email, address, phoneNumber } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, address, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/total', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        res.status(200).json(totalUsers);
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Failed to fetch total users' });
    }
});

app.get('/admins', async (req, res) => {
    try {
        const admins = await User.find({ role: { $in: ['seller', 'user','QualityAssurance'] } });

      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
});


//(20 May)
app.delete('/admins', async (req, res) => {
  try {
    const email = req.query.email;
    
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


  
module.exports = app;

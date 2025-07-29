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
  
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
      await transporter.sendMail({
        from: '"Tradxsell" <support@tradxsell.com>',
        to: newUser.email,
        subject: 'Please verify your email',
        html: `
          <h1>Email Verification</h1>
          <p>Hello ${newUser.username},</p>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 5 minutes.</p>
        `
      });

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
      return res.status(500).json({ error: 'Failed to add user' });
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
              <h1>Email Verification</h1>
              <p>Hello ${user.username},</p>
              <p>Please verify your email by clicking the link below:</p>
              <a href="${verificationUrl}">Verify Email</a>
              <p>This link will expire in 5 minutes.</p>
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
  const { email, password, role } = req.body;


    try {
        const user = await User.findOne({ email, role  });

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

        // Inside your /login route, after password is matched
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Login successful
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token, // Send token to frontend
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

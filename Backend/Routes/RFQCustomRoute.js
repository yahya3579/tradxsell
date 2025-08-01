const express = require('express');
const router = express.Router();
const RFQCustom = require('../Schemas/RFQCustom');
const User = require('../Schemas/UserSchema');
const sendMail = require('../utils/sendMail');

// User submits a custom RFQ
router.post('/', async (req, res) => {
  try {
    const { user, productName, description, quantity, city, country, deliveryPeriod, targetPrice, notes } = req.body;
    if (!user || !productName || !quantity || !city || !country || !deliveryPeriod || !targetPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const rfq = new RFQCustom({
      user,
      productName,
      description,
      quantity,
      city,
      country,
      deliveryPeriod,
      targetPrice,
      notes
    });
    await rfq.save();

    // Fetch user info for email
    const userDoc = await User.findById(user);
    // Send email to admin
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `New RFQ Submitted: ${productName}`,
      text: `A new RFQ has been submitted by ${userDoc?.email || 'a user'}:\n\nProduct: ${productName}\nDescription: ${description}\nQuantity: ${quantity}\nCity: ${city}\nCountry: ${country}\nDelivery Period: ${deliveryPeriod}\nTarget Price: ${targetPrice}\nNotes: ${notes}`,
      html: `<h3>New RFQ Submitted</h3><p><b>User:</b> ${userDoc?.email || 'a user'}</p><p><b>Product:</b> ${productName}</p><p><b>Description:</b> ${description}</p><p><b>Quantity:</b> ${quantity}</p><p><b>City:</b> ${city}</p><p><b>Country:</b> ${country}</p><p><b>Delivery Period:</b> ${deliveryPeriod}</p><p><b>Target Price:</b> ${targetPrice}</p><p><b>Notes:</b> ${notes}</p>`
    });

    res.status(201).json({ message: 'RFQ submitted', rfq });
  } catch (error) {
    console.error('Error submitting custom RFQ:', error);
    res.status(500).json({ error: 'Failed to submit RFQ' });
  }
});

// User: list their custom RFQs
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const rfqs = await RFQCustom.find({ user: userId }).sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user RFQs' });
  }
});

// Admin: list all custom RFQs
router.get('/admin', async (req, res) => {
  try {
    const rfqs = await RFQCustom.find().populate('user').sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RFQs' });
  }
});

// Admin: respond to a custom RFQ
router.put('/admin/:id/respond', async (req, res) => {
  try {
    const { id } = req.params;
    const { price, message } = req.body;
    if (!price || !message) {
      return res.status(400).json({ error: 'Price and message are required' });
    }
    const rfq = await RFQCustom.findByIdAndUpdate(
      id,
      {
        status: 'quoted',
        adminQuote: { price, message, sentAt: new Date() }
      },
      { new: true }
    ).populate('user');

    // Send email to user
    if (rfq && rfq.user && rfq.user.email) {
      await sendMail({
        to: rfq.user.email,
        subject: `RFQ Quote/Response for: ${rfq.productName}`,
        text: `Your RFQ for ${rfq.productName} has been quoted by admin.\n\nPrice: ${price}\nMessage: ${message}`,
        html: `<h3>Your RFQ for <b>${rfq.productName}</b> has been quoted by admin.</h3><p><b>Price:</b> ${price}</p><p><b>Message:</b> ${message}</p>`
      });
    }

    res.json({ message: 'Quote sent to user', rfq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to RFQ' });
  }
});

module.exports = router;
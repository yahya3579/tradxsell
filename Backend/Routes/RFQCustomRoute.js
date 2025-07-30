const express = require('express');
const router = express.Router();
const RFQCustom = require('../Schemas/RFQCustom');
const User = require('../Schemas/UserSchema');

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
    );
    res.json({ message: 'Quote sent to user', rfq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to RFQ' });
  }
});

module.exports = router;
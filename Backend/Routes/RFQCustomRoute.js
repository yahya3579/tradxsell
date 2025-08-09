const express = require('express');
const router = express.Router();
const RFQCustom = require('../Schemas/RFQCustom');
const User = require('../Schemas/UserSchema');
const sendMail = require('../utils/sendMail');
const path = require('path');

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
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New RFQ Submitted - Tradxsell</title>
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
                }
                .title {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                    font-weight: 600;
                    text-align: center;
                }
                .rfq-details {
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    padding: 25px;
                    margin: 20px 0;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    padding: 8px 0;
                    border-bottom: 1px solid #e9ecef;
                }
                .detail-row:last-child {
                    border-bottom: none;
                }
                .detail-label {
                    font-weight: 600;
                    color: #495057;
                    min-width: 120px;
                }
                .detail-value {
                    color: #6c757d;
                    text-align: right;
                    flex: 1;
                }
                .action-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    font-size: 14px;
                    font-weight: 600;
                    margin: 10px 5px;
                    box-shadow: 0 4px 15px rgba(239, 91, 43, 0.3);
                    transition: all 0.3s ease;
                }
                a.action-button, a.action-button:visited, a.action-button:hover, a.action-button:active {
                    color: #ffffff !important;
                    text-decoration: none !important;
                }
                .action-button:hover {
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
                .user-info {
                    background-color: #e3f2fd;
                    border: 1px solid #bbdefb;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 20px 0;
                    color: #1976d2;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                     <div class="logo"><img src="/public/TradxSell.jpg" alt="Tradxsell" style="height:48px"/></div>
                    <p class="header-subtitle">Your Trusted E-commerce Platform</p>
                </div>
                
                <div class="content">
                    <h1 class="title">📋 New RFQ Submitted</h1>
                    
                    <div class="user-info">
                        <strong>👤 Submitted by:</strong> ${userDoc?.email || 'Unknown User'}
                    </div>
                    
                    <div class="rfq-details">
                        <div class="detail-row">
                            <span class="detail-label">📦 Product:</span>
                            <span class="detail-value">${productName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">📝 Description:</span>
                            <span class="detail-value">${description || 'No description provided'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">🔢 Quantity:</span>
                            <span class="detail-value">${quantity}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">🏙️ City:</span>
                            <span class="detail-value">${city}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">🌍 Country:</span>
                            <span class="detail-value">${country}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">⏰ Delivery Period:</span>
                            <span class="detail-value">${deliveryPeriod}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">💰 Target Price:</span>
                            <span class="detail-value">${targetPrice}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">📄 Notes:</span>
                            <span class="detail-value">${notes || 'No additional notes'}</span>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL || 'https://tradxsell.com'}/admin/rfq" class="action-button" style="color:#ffffff !important;text-decoration:none !important;">
                            🔍 View All RFQs
                        </a>
                        <a href="${process.env.FRONTEND_URL || 'https://tradxsell.com'}/admin/dashboard" class="action-button" style="color:#ffffff !important;text-decoration:none !important;">
                            📊 Admin Dashboard
                        </a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© 2024 Tradxsell. All rights reserved.</p>
                    <p>This is an automated notification from Tradxsell Admin System</p>
                </div>
            </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, '../assets/logo.png'),
          cid: 'tradxsellLogo'
        }
      ]
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
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>RFQ Response - Tradxsell</title>
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
                  }
                  .title {
                      font-size: 24px;
                      color: #333;
                      margin-bottom: 20px;
                      font-weight: 600;
                      text-align: center;
                  }
                  .quote-details {
                      background-color: #f8f9fa;
                      border-radius: 8px;
                      padding: 25px;
                      margin: 20px 0;
                  }
                  .detail-row {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 12px;
                      padding: 8px 0;
                      border-bottom: 1px solid #e9ecef;
                  }
                  .detail-row:last-child {
                      border-bottom: none;
                  }
                  .detail-label {
                      font-weight: 600;
                      color: #495057;
                      min-width: 120px;
                  }
                  .detail-value {
                      color: #6c757d;
                      text-align: right;
                      flex: 1;
                  }
                  .price-highlight {
                      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                      color: white;
                      padding: 15px;
                      border-radius: 8px;
                      text-align: center;
                      margin: 20px 0;
                      font-size: 18px;
                      font-weight: 600;
                  }
                  .action-button {
                      display: inline-block;
                      background: linear-gradient(135deg, #EF5B2B 0%, #ff6b35 100%);
                       color: #ffffff;
                      text-decoration: none;
                      padding: 12px 25px;
                      border-radius: 25px;
                      font-size: 14px;
                      font-weight: 600;
                      margin: 10px 5px;
                      box-shadow: 0 4px 15px rgba(239, 91, 43, 0.3);
                      transition: all 0.3s ease;
                  }
                   a.action-button, a.action-button:visited, a.action-button:hover, a.action-button:active {
                       color: #ffffff !important;
                       text-decoration: none !important;
                   }
                  .action-button:hover {
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
                  .message-box {
                      background-color: #e3f2fd;
                      border: 1px solid #bbdefb;
                      border-radius: 5px;
                      padding: 15px;
                      margin: 20px 0;
                      color: #1976d2;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="header">
                      <div class="logo"><img src="/public/TradxSell.jpg" alt="Tradxsell" style="height:48px"/></div>
                      <p class="header-subtitle">Your Trusted E-commerce Platform</p>
                  </div>
                  
                  <div class="content">
                      <h1 class="title">💼 Your RFQ Has Been Quoted!</h1>
                      
                      <div class="quote-details">
                          <div class="detail-row">
                              <span class="detail-label">📦 Product:</span>
                              <span class="detail-value">${rfq.productName}</span>
                          </div>
                          <div class="detail-row">
                              <span class="detail-label">📅 Submitted:</span>
                              <span class="detail-value">${new Date(rfq.createdAt).toLocaleDateString()}</span>
                          </div>
                      </div>
                      
                      <div class="price-highlight">
                          💰 <strong>Quoted Price: ${price}</strong>
                      </div>
                      
                      <div class="message-box">
                          <strong>💬 Admin Message:</strong><br>
                          ${message}
                      </div>
                      
                      <div style="text-align: center; margin-top: 30px;">
                          <a href="${process.env.FRONTEND_URL || 'https://tradxsell.com'}/user/rfq" class="action-button" style="color:#ffffff !important;text-decoration:none !important;">
                              📋 View My RFQs
                          </a>
                          <a href="${process.env.FRONTEND_URL || 'https://tradxsell.com'}/userdashboard" class="action-button" style="color:#ffffff !important;text-decoration:none !important;">
                              🏠 My Dashboard
                          </a>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <p>© 2024 Tradxsell. All rights reserved.</p>
                      <p>Thank you for using Tradxsell!</p>
                  </div>
              </div>
          </body>
          </html>
          `,
          attachments: [
            {
              filename: 'logo.png',
              path: path.join(__dirname, '../assets/logo.png'),
              cid: 'tradxsellLogo'
            }
          ]
      });
    }

    res.json({ message: 'Quote sent to user', rfq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to RFQ' });
  }
});

module.exports = router;
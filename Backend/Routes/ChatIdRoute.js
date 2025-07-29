const express = require("express");
const Chat = require("../Schemas/Chat");
const User = require("../Schemas/UserSchema");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/:chatId', async (req, res) => {
    const { chatId } = req.params;
  
    // Validate chatId to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'Invalid chatId format' });
    }
  
    try {
      // Fetch the chat by its chatId and populate relevant fields like participants and messages
      const chat = await Chat.findById(chatId)
        .populate('participants', 'name avatar') // Populate participants with name and avatar
        .populate('messages.sender', 'name avatar'); // Populate sender details in messages
  
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
  
      // Send back the full chat document
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat', message: error.message });
    }
  });

module.exports = router;
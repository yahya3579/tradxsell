const express = require("express");
const Chat = require("../Schemas/Chat");
const User = require("../Schemas/UserSchema");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // Set the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the timestamp and original file name
    const fileExtension = path.extname(file.originalname); // Extract file extension
    cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${fileExtension}`);
  },
});

const upload = multer({ storage });

// API Route to start a new chat between sender and receiver
router.post('/start', async (req, res) => {
  const { senderId, receiverId } = req.body;

  // Validate the request body
  if (!senderId || !receiverId) {
    return res.status(400).json({ message: 'Sender and receiver IDs are required' });
  }

  try {
    // Check if a chat already exists between the sender and receiver
    const existingChat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (existingChat) {
      // If chat already exists, return the existing chat
      return res.status(200).json({ message: 'Chat already exists', chat: existingChat });
    }

    // Create a new chat document
    const newChat = new Chat({
      participants: [senderId, receiverId],
      messages: [],
    });

    // Save the new chat document
    await newChat.save();

    // Respond with the newly created chat
    res.status(201).json({ message: 'New chat started', chat: newChat });
  } catch (error) {
    console.error('Error starting chat:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Fetch chat between two users
router.get("/:userId/:sellerId", async (req, res) => {
  const { userId, sellerId } = req.params;
  try {
    const chat = await Chat.findOne({
      participants: { $all: [userId, sellerId] },
    }).populate("participants messages.sender");
    res.status(200).json(chat || { messages: [] });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch chat", message: error.message });
  }
});





// Route to send a message with or without a file
router.post("/send", async (req, res) => {
  const { senderId, receiverId, text, file } = req.body; // Get base64 file from the request body
  let filePath = null;

  // If a base64 file is provided, decode and save the file
  if (file) {
    // Extract the file extension from the base64 string (e.g., "png", "jpeg")
    const extension = file.split(";")[0].split("/")[1];
    const base64Data = file.replace(/^data:.*,/, ""); // Remove the base64 data prefix
    const buffer = Buffer.from(base64Data, "base64");

    // Generate a unique filename using the current timestamp
    const fileName = `${Date.now()}-${senderId}.${extension}`; // Use dynamic extension
    const fileDir = "uploads/images"; // Directory to save the file
    const filePathToSave = path.join(fileDir, fileName); // Full path for saving the file

    try {
      // Create the uploads/images directory if it doesn't exist
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      // Write the decoded file data to the server
      fs.writeFileSync(filePathToSave, buffer);
      filePath = `/uploads/images/${fileName}`;
    } catch (err) {
      console.error("Error saving file:", err);
      return res.status(500).json({ error: "Failed to save the file" });
    }
  }

  try {
    // Find an existing chat between sender and receiver
    let chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });

    // If the chat doesn't exist, create a new one
    if (!chat) {
      chat = new Chat({ participants: [senderId, receiverId] });
    }

    // Add the new message to the chat, with or without a file
    chat.messages.push({
      sender: senderId,
      text: text || '', // If no text is provided, store an empty string
      file: filePath,   // Store the relative file path, or null if no file
    });

    // Save the chat to the database
    await chat.save();

    // Respond with the updated chat data
    res.status(201).json(chat);
  } catch (error) {
    // Handle any errors
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message", message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check for valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId format." });
    }

    // Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find all chats where the provided ID matches any participant
    const chats = await Chat.find({
      participants: { $in: [objectId] },
    }).populate("participants messages.sender");

    if (!chats.length) {
      return res
        .status(404)
        .json({ message: "No chats found for this participant." });
    }

    res.status(200).json(chats); // Return full chat documents
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch chats", message: error.message });
  }
});

module.exports = router;

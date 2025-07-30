const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// CORS middleware FIRST
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://tradxsell.com", // production
      "https://www.tradxsell.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type'],
  })
);
// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Serve static files
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

// Routes imports
const productRoutes = require('./Routes/ProductRoutes.js');
const userRoutes = require('./Routes/UserRoutes.js');
const cartRoutes = require('./Routes/CartRoutes.js');
const Reviewroutes = require('./Routes/ReviewRoutes.js');
const orderroutes = require('./Routes/OrderRoutes.js');
const sellerroutes = require('./Routes/SellerRoute.js');
const complaintRoutes = require('./Routes/complainroute.js');
const productSearchRoutes = require('./Routes/productSearchRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const ChatRoutes = require('./Routes/ChatRoutes.js');
const ChatsRoutes = require('./Routes/ChatIdRoute.js');
const sellerRoutes = require('./Routes/SellerRoute');
const rfqCustomRoute = require('./Routes/RFQCustomRoute');

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://tradxsell.com",
      "https://www.tradxsell.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type'],
  },
});

// Routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/review", Reviewroutes);
app.use("/orders", orderroutes);
app.use("/seller", sellerRoutes); // <-- Register seller routes
app.use("/complaints", complaintRoutes);
app.use("/productSearch", productSearchRoutes);
app.use("/payment", paymentRoutes);
app.use("/chat", ChatRoutes);
app.use("/chats", ChatsRoutes);  // for specific purpose 
app.use('/rfq/custom', rfqCustomRoute);

// MongoDB connection
const mongoURL = process.env.MONGODB_URL;
mongoose
  .connect(mongoURL, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// WebSocket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listening for a new message
  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    io.emit("receiveMessage", data); // Broadcast message to all connected clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.json("TradXSell App");
});

// Start the server with Socket.IO support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ TradXSell Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/products/latest`);
  console.log(`🌐 CORS enabled for: http://localhost:3000, https://tradxsell.com`);
});
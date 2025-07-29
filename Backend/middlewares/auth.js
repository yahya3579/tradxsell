const jwt = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied"
      });
    }

    // Extract token
    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is valid but user not found"
      });
    }

    // Check if user account is active
    if (user.status === "inactive" || user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Account is inactive or suspended"
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error in authentication"
    });
  }
};

module.exports = authMiddleware;
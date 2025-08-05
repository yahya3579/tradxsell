const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const allowedImageFormats = ["jpg", "jpeg", "png", "webp"];

    const params = {
      folder: "seller_uploads",
      resource_type: "auto" // Handles both images and documents
    };

    // Only add image-specific parameters for images
    if (isImage) {
      params.transformation = [{ width: 800, height: 800, crop: "limit" }];
      params.allowed_formats = allowedImageFormats;
    }

    return params;
  },
});

module.exports = { cloudinary, storage };

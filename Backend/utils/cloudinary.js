// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "seller_uploads",
//     allowed_formats: ["jpg", "jpeg", "png"],
//     transformation: [{ width: 800, height: 800, crop: "limit" }],
//   },
// });

// module.exports = { cloudinary, storage };



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

    return {
      folder: "seller_uploads",
      resource_type: "auto", // ✅ Handles both images and documents
      format: isImage ? file.mimetype.split("/")[1] : undefined,
      transformation: isImage
        ? [{ width: 800, height: 800, crop: "limit" }]
        : undefined,
      allowed_formats: isImage ? allowedImageFormats : undefined,
    };
  },
});

module.exports = { cloudinary, storage };

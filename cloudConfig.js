const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();  // Ensure environment variables are loaded

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,   // Fix key name
    api_secret: process.env.CLOUD_API_SECRET  // Fix secret name
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'NestNow_:)',  // Ensure this folder exists in your Cloudinary account
        allowedFormats: ['png', 'jpeg', 'jpg'],  // Fix incorrect property name
    },
});

module.exports = {
    cloudinary,
    storage,
};

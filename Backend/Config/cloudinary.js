const cloudinary = require("cloudinary").v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadToCloudinary = async (file)=>{
    try {
        if(!file) return null;

        const result = await cloudinary.uploader.upload(file.path,{
            folder: 'profile_images',
            width:500,
            heigth:500,
            crop:'fill',
            quality:'auto'
        })

        return {
            url: result.secure_url,
            public_id: result.public_id,
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Error uploading image to Cloudinary');
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Error deleting image from Cloudinary');
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};
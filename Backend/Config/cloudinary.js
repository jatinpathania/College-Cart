const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadToCloudinary = async (file) => {
    try {
        if (!file || !file.buffer) {
            throw new Error('No file provided or invalid file format');
        }

        
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'assets',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        reject(error);
                    } else {
                        resolve({
                            url: result.secure_url,
                            public_id: result.public_id
                        });
                    }
                }
            );
            const bufferStream = new Readable();
            bufferStream.push(file.buffer);
            bufferStream.push(null);
            bufferStream.pipe(stream);
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Error uploading image to Cloudinary');
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('No public ID provided');
        }

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
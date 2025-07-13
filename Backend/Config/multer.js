const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
     //   console.log("Received file in multer:", file);
        // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        // if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        // } else {
        //     cb(new Error('Invalid file type'), false);
        // }
    },
     limits: { fileSize: 5 * 1024 * 1024 } 
})

module.exports = upload;
const path = require("path")
const fs = require("fs");
const { v4: uuid4 } = require("uuid")
const ProductAdd = require("../Model/productAddForm");
const multer = require("multer");
const {uploadToCloudinary, deleteFromCloudinary} = require("../Config/cloudinary");
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("Received file in multer:", file);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
     limits: { fileSize: 5 * 1024 * 1024 } 
})

exports.productAddForm = upload.single('image');

exports.createProduct = async (req, res) => {
    try {


        console.log("file created",req.file)

        const { cloudinaryPublicId,name, brand, category, selectHostel, hostleName, roomNumber, dayScholarContectNumber, prevAmount, newAmount, description } = req.body;

        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        if (!name || !brand || !category || !selectHostel || !prevAmount || !newAmount || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (selectHostel === "Hostler" && (!hostleName || !roomNumber)) {
            return res.status(400).json({ message: "Hostel name and room number are required for hostlers" });
        }

        if (selectHostel === "Day Scholar" && !dayScholarContectNumber) {
            return res.status(400).json({ message: "Contact number is required for day scholars" });
        }


        // const image = req.file ? `/assets/${req.file.filename}` : null;
        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        let cloudinaryResult;
        try {
            cloudinaryResult = await uploadToCloudinary(req.file);
            console.log("Cloudinary result:", cloudinaryResult);
            if (!cloudinaryResult) {
                return res.status(400).json({ message: "Image upload failed" });
            }
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ 
                success: false, 
                message: "Error uploading image",
                error: uploadError.message 
            });
        }


        const createProduct = await ProductAdd.create({
            cloudinaryPublicId,
            name,
            brand,
            category,
            selectHostel,
            hostleName,
            roomNumber,
            dayScholarContectNumber,
            image:cloudinaryResult.url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            description,
            prevAmount,
            newAmount,
            userId:req.user._id
        })

        return res.status(201).json({ message: "Product created successful!", product: createProduct });

    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ success:false, message: "Error during product created" ,error:error.message});
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await ProductAdd.find().populate('userId','name');
        return res.status(200).json({success: true, count: products.length, products });
    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({success:false, message: "Error during product fetch",error:error.message });
    }
}
exports.getPublicProducts = async (req, res) => {
    try {
        const products = await ProductAdd.find().select("name prevAmount newAmount image category"); 
        return res.status(200).json({ success: true, count: products.length, products });
    } catch (error) {
        console.error("Get public products error:", error);
        return res.status(500).json({ success: false, message: "Error during product fetch", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    const {id}=req.params
    try {
        const product = await ProductAdd.findOne({
            _id:id
        }).populate('userId','name');
        if (!product) {
            return res.status(404).json({success:false, message: "Product not found" });
        }
        return res.status(200).json({ success:true, product })
    } catch (error) {
        console.error("Get product by ID error:", error);
        return res.status(500).json({success:false, message: "Error during fetch id data", error:error.message });
    }
}

exports.productDeleteById = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await ProductAdd.findById({
            _id:id
        })
        if (!product) {
            return res.status(404).json({success:false, message: "Product not found" });
        }
        if(product.cloudinaryPublicId){
            await deleteFromCloudinary(product.cloudinaryPublicId)
        }

        await product.deleteOne();

        return res.status(200).json({success:true, message: "Product delete successfull" })
    } catch (error) {
        console.error("Delete product error:", error);
        return res.status(500).json({ message: "Error during delete id data", error:error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await ProductAdd.findById({
            _id:id
        });
        if (!product) {
            return res.status(404).json({success:false, message: "Product not found" });
        }

        if(req.file){
          const cloudinaryResult = await uploadToCloudinary(req.file);
          if(!cloudinaryResult){
            return res.status(400).json({ message: "Image upload failed" });
          }

          if(product.cloudinaryPublicId){
            await deleteFromCloudinary(product.cloudinaryPublicId)
          }
          req.body.image = cloudinaryResult.url;
          req.body.cloudinaryPublicId = cloudinaryResult.public_id
        }

        const updateProduct = await ProductAdd.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new: true, runValidators: true}
        ).populate("userId","name");

        return res.status(200).json({success:true, message: "Product update successfull", updateProduct })
    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({success:false, message: "Error during update",error:error.message })
    }
}
const ProductAdd = require("../Model/productAddForm");
const multer = require("multer");
const {uploadToCloudinary, deleteFromCloudinary} = require("../Config/cloudinary");
const Cart = require("../Model/cartProductAdd");
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // console.log("Received file in multer:", file);
        // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        // if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        // } else {
        //     cb(new Error('Invalid file type'), false);
        // }
    },
     limits: { fileSize: 5 * 1024 * 1024 } 
})

exports.productAddForm = upload.single('image');

exports.createProduct = async (req, res) => {
    try {

     
        // console.log("file created",req.body)

        const { cloudinaryPublicId,name, brand, category,quantity, selectHostel, hostleName, roomNumber, dayScholarContectNumber, prevAmount, newAmount, description } = req.body;

        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        if (quantity === 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot create product with zero quantity"
            });
        }

        if (!name || !brand || !category || !quantity || !selectHostel || !prevAmount || !newAmount || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (selectHostel === "Hostler" && (!hostleName || !roomNumber)) {
            return res.status(400).json({ message: "Hostel name and room number are required for hostlers" });
        }

        if (selectHostel === "Day_Scholar" && !dayScholarContectNumber) {
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

        if(selectHostel === "Hostler"){
            const createProduct = await ProductAdd.create({
                cloudinaryPublicId,
                name,
                brand,
                category,
                quantity,
                selectHostel,
                hostleName,
                roomNumber,
                image:cloudinaryResult.url,
                cloudinaryPublicId: cloudinaryResult.public_id,
                description,
                prevAmount,
                newAmount,
                userId:req.user._id
            })

            return res.status(201).json({ message: "Product created successful!", product: createProduct });
        }

        if(selectHostel === "Day_Scholar"){
            const createProduct = await ProductAdd.create({
                cloudinaryPublicId,
                name,
                brand,
                category,
                quantity,
                selectHostel,
                dayScholarContectNumber,
                image:cloudinaryResult.url,
                cloudinaryPublicId: cloudinaryResult.public_id,
                description,
                prevAmount,
                newAmount,
                userId:req.user._id
            })

            return res.status(201).json({ message: "Product created successful!", product: createProduct });
        }

    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ success:false, message: "Error during product created" ,error:error.message});
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        // console.log(req.user._id)
        const products = await ProductAdd.find().populate('userId','name profileImage');
        const findProduct = products.filter(user=>
            user.userId._id.toString() !== req.user._id.toString()
        )
        // console.log("userId",findProductUserId)
        //  if(!findProductUserId){ 
            return res.status(200).json({success: true, count: findProduct.length, products:findProduct });
        //  }
        // const products = await ProductAdd.find().populate('userId','name');
        // return res.status(200).json({success: true, count: products.length, products });
    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({success:false, message: "Error during product fetch",error:error.message });
    }
}


exports.getAllProfileProductUserCreate = async (req,res)=>{
    const {id} = req.params
    try {
        if(!id || !req.user._id.toString()){
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }        
        // console.log(req.user._id)
        const products = await ProductAdd.find().populate('userId','name');
        // console.log(id)
        if(id === req.user._id.toString()){
            const findProductUserIdById = products.filter(user=>
                user.userId._id.toString() === req.user._id.toString()
            )
         return res.status(200).json({success: true, count: findProductUserIdById.length, products:findProductUserIdById });
        }
       
    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({success:false, message: "Error during product fetch",error:error.message });
    }
}


exports.updateStockZeroAndOne = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        const products = await ProductAdd.find().populate('userId', 'name');

        const filteredCartItems = cartItems.filter(item =>
            products.some(product => product._id.toString() === item.productId.toString())
        );

        if (filteredCartItems.length > 0) {
          
            const productQuantityMap = new Map();

            products.forEach(product => {
                productQuantityMap.set(product._id.toString(), {
                    totalQuantity: product.quantity,
                    cartQuantity: 0
                });
            });

            filteredCartItems.forEach(item => {
                const productId = item.productId.toString();
                if (productQuantityMap.has(productId)) {
                    const data = productQuantityMap.get(productId);
                    data.cartQuantity += item.quantity || 0;
                    productQuantityMap.set(productId, data);
                }
            });
            
            const updatePromises = Array.from(productQuantityMap.entries()).map(([productId, data]) => {
                const remainingQuantity = data.totalQuantity - data.cartQuantity;
                return ProductAdd.updateOne(
                    { _id: productId },
                    { $set: { stock: remainingQuantity <= 0 ? 0 : 1 } }
                );
            });
            const updateResults = await Promise.all(updatePromises);
            const totalUpdates = updateResults.reduce((sum, result) => sum + result.modifiedCount, 0);

            return res.status(200).json({
                success: true,
                message: "Stock updated successfully",
                updatedProducts: totalUpdates
            });
        } else {
            const resetResult = await ProductAdd.updateMany(
                {},
                { $set: { stock: 1 } }
            );

            return res.status(200).json({
                success: true,
                message: "All products stock reset to 1",
                updatedProducts: resetResult.modifiedCount
            });
        }
    } catch (error) {
        console.error("Stock update error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating stock",
            error: error.message
        });
    }
};

exports.getPublicProducts = async (req, res) => {
    try {
        const products = await ProductAdd.find().select("name prevAmount newAmount image category stock"); 
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
        }).populate('userId','name profileImage');
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

async function handleProductDeletion(product) {
    if (product.cloudinaryPublicId) {
        await deleteFromCloudinary(product.cloudinaryPublicId);
    }
    await product.deleteOne();
}

exports.updateProduct = async (req, res) => {
    const {id} = req.params;
    // console.log(req.body, id)
    const { cloudinaryPublicId,name, brand, category,quantity, selectHostel, hostleName, roomNumber, dayScholarContectNumber, prevAmount, newAmount, description } = req.body;
    try {
        const product = await ProductAdd.findById({
            _id:id
        });
        if (!product) {
            return res.status(404).json({success:false, message: "Product not found" });
        }

        if (Number(req.body.quantity) === 0) {
            await handleProductDeletion(product);
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully because quantity reached zero"
            });
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

        // const updateProduct = await ProductAdd.findByIdAndUpdate(
        //     {_id:id},
        //     req.body,
        //     {new: true, runValidators: true}
        // ).populate("userId","name");

        if(selectHostel === "Hostler"){
            const updateProduct = await ProductAdd.findByIdAndUpdate( {_id:id},{
                cloudinaryPublicId,
                name,
                brand,
                category,
                quantity,
                selectHostel,
                hostleName,
                roomNumber,
                // image:cloudinaryResult.url,
                // cloudinaryPublicId: cloudinaryResult.public_id,
                description,
                prevAmount,
                newAmount,
                userId:req.user._id,
                
            },{new: true, runValidators: true}).populate("userId","name");

            return res.status(200).json({success:true, message: "Product update successfull", updateProduct })
        }

        if(selectHostel === "Day_Scholar"){
            const updateProduct = await ProductAdd.findByIdAndUpdate( {_id:id},{
                cloudinaryPublicId,
                name,
                brand,
                category,
                quantity,
                selectHostel,
                dayScholarContectNumber,
                // image:cloudinaryResult.url,
                // cloudinaryPublicId: cloudinaryResult.public_id,
                description,
                prevAmount,
                newAmount,
                userId:req.user._id,
                
            },{new: true, runValidators: true}).populate("userId","name");

            return res.status(200).json({success:true, message: "Product update successfull", updateProduct })
        }

        // return res.status(200).json({success:true, message: "Product update successfull", updateProduct })
    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({success:false, message: "Error during update",error:error.message })
    }
}
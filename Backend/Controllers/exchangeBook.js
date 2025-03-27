const multer = require("multer");
const { uploadToCloudinary, deleteFromCloudinary } = require("../Config/cloudinary");
const exchange = require("../Model/exchangeBook");
const { messagePost } = require("./message");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { 
    fileSize: 5 * 1024 * 1024 
  }
});

exports.productImage = upload.single("image");

exports.exchangeBookCreate = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(404).json({
        success: false,
        message: "User authentication required"
      });
    }

    const {
      cloudinaryPublicId, 
      name, 
      selectHostel, 
      hostleName, 
      roomNumber, 
      dayScholarContectNumber, 
      description 
    } = req.body;

    if (selectHostel === "Hostler" && (!hostleName || !roomNumber)) {
      return res.status(400).json({
        success: false, 
        message: "Hostel name and room number are required for hostlers" 
      });
    }

    if (selectHostel === "Day_Scholar" && (!dayScholarContectNumber)) {
      return res.status(400).json({
        success: false, 
        message: "Contact number is required for day scholars"
      });
    }


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    let cloudinaryResult;
    try {
      console.log('Attempting Cloudinary upload with file:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      cloudinaryResult = await uploadToCloudinary(req.file);
      
      if (!cloudinaryResult) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed"
        });
      }
    } catch (error) {
      console.error('Detailed Cloudinary Upload Error:', error);
      return res.status(500).json({
        success: false, 
        message: "Error uploading image", 
        error: error.message,
        fullError: error
      });
    }


    const productData = {
      cloudinaryPublicId,
      name,
      selectHostel,
      image: cloudinaryResult.url,
      cloudinaryPublicId: cloudinaryResult.public_id,
      description,
      userId: req.user._id
    };

    if (selectHostel === "Hostler") {
      productData.roomNumber = roomNumber;
      productData.hostleName = hostleName;
    } else if (selectHostel === "Day_Scholar") {
      productData.dayScholarContectNumber = dayScholarContectNumber;
    }

    const createProduct = await exchange.create(productData);

    return res.status(201).json({ 
      success: true,
      message: "Product created successfully!", 
      product: createProduct 
    });
    
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error during product creation", 
      error: error.message 
    });
  }
}

exports.getAllProduct = async(req,res)=>{
  try {
    const allproduct = await exchange.find().populate('userId','name email')
    if(!allproduct){
      return res.status(404).json({success:false, message:"Product not found"})
    }
    return res.status(200).json({success:true,message:"All product found", product:allproduct})
  } catch (error) {
    return res.status(500).json({success:false, message:"Found product during error"})
  }
}

exports.getProductById=async(req,res)=>{
  const {id} = req.params;
  // console.log(id)
  try {
    const productById = await exchange.findById({_id:id}).populate('userId', 'name email');
    if(!productById){
      return res.status(404).json({success:false, message:"Product not found"})
    }

    return res.status(200).json({success:true, message:"Product found", product:productById})
  } catch (error) {
    return res.status(500).json({success:false, message:"Found product during error"})
  }
}

exports.deleteProductById = async(req,res)=>{
  const{id} = req.params;
  try {
    const productById = await exchange.findById({_id:id});
    if(!productById){
      return res.status(404).json({success:false, message:"Product not found"})
    }
    if(productById.cloudinaryPublicId){
      await deleteFromCloudinary(productById.cloudinaryPublicId)
    }

    await exchange.deleteOne();

    return res.status(200).json({success:true, message: "Product delete successfull" })
  } catch (error) {
    return res.status(500).json({ message: "Error during delete id data", error:error.message });
  }
}
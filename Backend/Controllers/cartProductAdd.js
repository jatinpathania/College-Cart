const Cart = require("../Model/cartProductAdd");

exports.cartProduct = async (req, res) => {
  try {
    // console.log(req.body)
    const {productId,name,totalQunatity,brand,category,selectHostel,hostleName,roomNumber,dayScholarContectNumber,price,prevPrice,totalPrice,image,productQuantity,quantity } = req.body;
    const cartProductAdd = await Cart.findOneAndUpdate(
      { productId,userId: req.user._id }, 
      {
        $set: {
          name,
          brand,
          category,
          selectHostel,
          hostleName,
          roomNumber,
          dayScholarContectNumber,
          price,
          prevPrice,
          totalPrice,
          image,
          // description,
          productQuantity,
          quantity,
        }
        
      },
      {
        new: true, 
        upsert: true,
        runValidators: true 
      },
    );

    return res.status(200).json({
      success: true,
      product: cartProductAdd,
      message: cartProductAdd.isNew ? "Product added to cart" : "Cart updated successfully"
    });

  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllCartProduct=async(req,res)=>{
  try {
    // console.log(req.user._id)
    const product = await Cart.find({ userId: req.user._id })
    return res.status(201).json({success:true, item:product})
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

exports.deleteProductByIdForCart = async(req,res)=>{
  const {id} = req.params;
  try {
    const cartProduct = await Cart.findById({
      _id:id
    })
    if(!cartProduct){
      return res.status(404).json({success:false, messgae:"Cart Product Not found"});
    }

    await cartProduct.deleteOne();

    res.status(201).json({success:true, message:"Cart Product delete successfull"})
  } catch (error) {
     res.status(500).json({success:false, message:"Cart product deletion during error"})
  }
}

exports.updateQunatityFiled = async(req,res)=>{
  const {id} = req.params;
  const {quantity} = req.body
  try {
    const cartProduct = await Cart.findById({
      _id:id
    })
  
    if(!cartProduct){
      return res.status(404).json({success:false, message:"Cart item not found"});
    }
    if (quantity > cartProduct.productQuantity) {
      return res.status(400).json({ 
        success: false, 
        message: "Cannot add quantity. Not available product stock."
      });
    }
    const newTotalPrice =  cartProduct.price * quantity;
       const updateCartItemQunatity = await Cart.findByIdAndUpdate({_id:id},
        { $set:{quantity:quantity,totalPrice : newTotalPrice}},
         {new:true},
        )
    
    return res.status(200).json({updateCartItemQunatity})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, message:"Cart product updating filed quantity during error"})
  }
}
const bookExchangeOrder = require("../Model/bookExchangeOrder");
const exchange = require("../Model/exchangeBook");

exports.createBookExchangeOrder=async(req,res)=>{

    const {id} = req.params;

    const {bookName,bookId, sealUser, buyUser, selectOption,hostleName,roomNumber,dayScholarContectNumber}= req.body;
    try {

       const createProductId = await exchange.findById({_id:id})
    //    console.log(createProductId._id);   
   
        if(createProductId){
            if (selectOption === "Hostler" && (!hostleName || !roomNumber)) {
                return res.status(400).json({ message: "Hostel name and room number are required for hostlers" });
            }
    
            if (selectOption === "Day_Scholar" && !dayScholarContectNumber) {
                return res.status(400).json({ message: "Contact number is required for day scholars" });
            }
            if(selectOption==="Hostler"){
                const createOrder = await bookExchangeOrder.create({
                    bookId:createProductId._id,
                    bookName:createProductId.name,
                    sealUser,
                    buyUser,
                    selectOption,
                    hostleName,
                    roomNumber,
                })
    
                return res.status(201).json({success:true, message:"Order create successful for exchange book", createOrder})
            }
            if(selectOption==="Day_Scholar"){
                const createOrder = await bookExchangeOrder.create({
                    bookId:createProductId._id,
                    bookName:createProductId.name,
                    sealUser,
                    buyUser,
                    selectOption,
                    dayScholarContectNumber
                })
    
                return res.status(201).json({success:true, message:"Order create successful for exchange book", createOrder})
            }
        }
    } catch (error) {
        console.log("Error",error);
        return res.status(400).json({success:false,message:"Order create during error"})
    }
}

exports.getAllExchangeBookOrder = async(req,res)=>{
  try {
    const allOrder = await bookExchangeOrder.find({});
    if(!allOrder){
        return res.status(404).json({message:"Order not found for book exchange"});
    }
    return res.status(202).json({success:true, message:"All order found for exchange book", order:allOrder});
  } catch (error) {
    return res.status(400).json({success:false, message:"Order found during error"});
  }
}

exports.deleteExchangeBookOrderById=async (req,res) => {
    const {id} = req.params;
    // console.log(id)
    try {
        const orderDelete = await bookExchangeOrder.findById(id);
        // console.log(orderDelete)
        if(!orderDelete){
            return res.status(404).json({message:"Order not found"})
        }
        await orderDelete.deleteOne();
        return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        return res.status(400).json({success:false, message:"Order delete during error"});
    }
}
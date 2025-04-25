const bookExchangeOrder = require("../Model/bookExchangeOrder");
const request = require("../Model/request");

exports.createRequest = async (req,res) => {
    const {id} = req.params;
    const {bookId,bookName,approvedUserByBook,approvedBookForUser,approvedStatus} = req.body;
    try {
        const orderBook = await bookExchangeOrder.findById({_id:id});

        if(orderBook){
            const requestCreate = await request.create({
                bookId:orderBook.bookId,
                bookName:orderBook.bookName,
                approvedBookForUser,
                approvedStatus,
                approvedUserByBook
            })
            return res.status(201).json({success:true, message:"Request handle", requestCreate})
        }

    } catch (error) {
        console.log("Error",error)
        return res.status(400).json({success:false, message:"Request during error"})
    }
}

exports.getAllRequest=async(req,res)=>{
  try {
    const allRequest = await request.find({});
    return res.status(202).json({message:"All request book", allRequest})
  } catch (error) {
    return res.status(400).json({ message:"Request during error"})
  }
}

exports.deleteRequest=async(req,res)=>{
  const {id}=req.params;
  try {
    const requestId = await request.findById({_id:id});
    if(!requestId){
      return res.status(404).json({message:"Request not found"})
    }
    await requestId.deleteOne();
    return res.status(200).json({message:"Request delete Successful"})
  } catch (error) {
    return res.status(404).json({message:"Request during error"})
  }
}
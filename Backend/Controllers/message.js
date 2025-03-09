const Message = require("../Model/message");

exports.messagePost=async(req,res)=>{
    try {
        const { senderId,receiverId, message, roomId } = req.body;
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
            roomId
        })
      return  res.status(201).json(newMessage);
    } catch (error) {
        return  res.status(400).json({ message: error.message });
    }
}
exports.getMessageRoomId=async(req,res)=>{
    try {
        const messages = await Message.find({ roomId: req.params.roomId });
       return res.json(messages);
      } catch (error) {
       return res.status(500).json({ message: error.message });
      }
}
exports.getAllMessage=async(req,res)=>{
    try {
        const messages = await Message.find();
      return  res.json(messages);
      } catch (error) {
       return res.status(500).json({ message: error.message });
      }
}

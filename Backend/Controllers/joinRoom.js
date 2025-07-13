const join_room = require("../Model/joinRoomId");

exports.joinRoomIdPost=async(req,res)=>{
    const {loginUserId, sentUserId, productId} = req.body;
    try {
        const existingRoom = await join_room.findOne({
            users: {$all: [loginUserId, sentUserId, productId]}
        })
        if(existingRoom){
            return res.status(200).json({
                message : "room already exist",
                room : existingRoom
            })
        }
        const room = await join_room.create({
            users : [loginUserId,sentUserId, productId]
        });
        return res.status(200).send({
            message : "room created succesfully",
            room
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getMessages=async(req,res)=>{
    try {
        const messages = await join_room.find();
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.getJoinRoomDetails = async (req, res) => {
    try {
      const room = await join_room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      return res.status(200).json(room);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
};
const mongoose = require("mongoose");

const joinRoomSchema = new mongoose.Schema({
    users: [String],
    updatedAt: [String]
}, {timestamps:true});

const join_room = mongoose.model("join_room", joinRoomSchema);

module.exports = join_room;
const express = require("express");
const { joinRoomIdPost, getMessages, getJoinRoomDetails } = require("../Controllers/joinRoom");
const router = express.Router();

router.post("/joinRoom", joinRoomIdPost)
router.get("/joinRooms", getMessages)
router.get("/joinRoom/:roomId", getJoinRoomDetails);
module.exports = router;
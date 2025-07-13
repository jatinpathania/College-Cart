const express = require("express");
const { messagePost, getAllMessage, getMessageRoomId } = require("../Controllers/message");
const router = express.Router();

router.post("/message", messagePost)
router.get("/message/:roomId",getMessageRoomId )
router.get("/messages", getAllMessage )

module.exports = router;
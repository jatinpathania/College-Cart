const express = require("express");
const { agentCreateInput } = require("../Controllers/agent");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/agent",isAuthenticated ,agentCreateInput);


module.exports = router
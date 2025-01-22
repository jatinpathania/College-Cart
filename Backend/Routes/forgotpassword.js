const express = require("express")
const router = express.Router();

const forgotPassword = require("../Controllers/forgotpassword");

router.post("/for-got-password-send",forgotPassword.sendCode);
router.post("/verify-for-got-password",forgotPassword.verifyCode);

module.exports = router;
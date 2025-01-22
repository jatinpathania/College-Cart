const express = require("express")
const router = express.Router();

const accountCreate = require("../Controllers/user")

router.post("/signup",accountCreate.signup);
router.post("/verify-email", accountCreate.verifyEmail);
router.post("/login",accountCreate.login);
router.put('/:id/password', accountCreate.updatePassword);

module.exports = router;
const express = require("express")
const router = express.Router();

const accountCreate = require("../Controllers/user")
const {isAuthenticated} = require("../middleware/auth")

router.post("/signup",accountCreate.signup);
router.post("/verify-email", accountCreate.verifyEmail);
router.post("/login",accountCreate.login);
router.put('/password', isAuthenticated, accountCreate.updatePassword);
router.get("/user-profile", isAuthenticated, (req, res) => {
    const { email, name, username,_id,profileImage } = req.user;
    res.status(200).json({
        success: true,
        data: { email, name, username,_id,profileImage }
    });
});

module.exports = router;
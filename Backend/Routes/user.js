const express = require("express")
const router = express.Router();
const upload = require("../Config/multer")


const accountCreate = require("../Controllers/user")
const {isAuthenticated} = require("../middleware/auth")

router.post("/signup",accountCreate.signup);
router.post("/verify-email", accountCreate.verifyEmail);
router.post("/login",accountCreate.login);
router.put('/password', accountCreate.updatePassword);
router.get("/user-profile", isAuthenticated, (req, res) => {
    const { email, name, username,_id,profileImage, createdAt, updatedAt } = req.user;
    res.status(200).json({
        success: true,
        data: { email, name, username,_id,profileImage, createdAt, updatedAt }
    });
});

router.patch("/update-profile/:id", isAuthenticated, upload.single('profileImage'), accountCreate.updateProfileImageAndUserName);
router.get("/user/:userId", accountCreate.getUserDetails);

module.exports = router;
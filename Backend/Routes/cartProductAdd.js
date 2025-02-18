const express = require("express");
const { cartProduct, getAllCartProduct } = require("../Controllers/cartProductAdd");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/cartProductAdd", isAuthenticated, cartProduct);
router.get("/all-cart-product", isAuthenticated,getAllCartProduct);

module.exports = router;
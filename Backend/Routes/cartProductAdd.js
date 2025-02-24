const express = require("express");
const { cartProduct, getAllCartProduct, deleteProductByIdForCart, updateQunatityFiled } = require("../Controllers/cartProductAdd");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/cartProductAdd", isAuthenticated, cartProduct);
router.get("/all-cart-product", isAuthenticated,getAllCartProduct);
router.delete("/:id/cart-product-delete", deleteProductByIdForCart);
router.put("/:id/update-quantity-filed", updateQunatityFiled);
module.exports = router;
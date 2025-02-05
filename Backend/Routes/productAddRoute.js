const express = require("express")
const router = express.Router();

const productCreate = require("../Controllers/productAddForm");
const { isAuthenticated } = require("../middleware/auth");

router.post("/product-create", isAuthenticated, productCreate.productAddForm,productCreate.createProduct);
router.get("/all-product",productCreate.getAllProduct);
router.get("/:id/product",productCreate.getProductById);
router.delete("/:id/product-delete", isAuthenticated, productCreate.productDeleteById);
router.put("/:id/product-update",isAuthenticated, productCreate.updateProduct);

module.exports = router;
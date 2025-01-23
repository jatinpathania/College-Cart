const express = require("express")
const router = express.Router();

const productCreate = require("../Controllers/productAddForm")

router.post("/product-create", productCreate.productAddForm,productCreate.createProduct);
router.get("/all-product",productCreate.allProduct);
router.get("/:id/product",productCreate.productById);
router.delete("/:id/product",productCreate.productDeleteById);


module.exports = router;
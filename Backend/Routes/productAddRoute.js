const express = require("express")
const router = express.Router();

const productCreate = require("../Controllers/productAddForm")

router.post("/product-create", productCreate.productAddForm,productCreate.createProduct);


module.exports = router;
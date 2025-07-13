const express = require('express');
const router = express.Router();
const { 
  productImage, 
  exchangeBookCreate, 
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductBookExchange
} = require('../Controllers/exchangeBook');
const { isAuthenticated } = require('../middleware/auth');
const upload = require("../Config/multer")

router.post('/create', 
  isAuthenticated,         
  productImage,            
  exchangeBookCreate 
);

router.get("/allProduct", isAuthenticated, getAllProduct)
router.get("/:id/productId", getProductById)
router.delete("/:id/deleteId",isAuthenticated, deleteProductById)
router.put("/:id/updateBook", isAuthenticated, upload.single('image'),updateProductBookExchange)

module.exports = router;
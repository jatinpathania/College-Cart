const express = require('express');
const router = express.Router();
const { 
  productImage, 
  exchangeBookCreate, 
  getAllProduct,
  getProductById,
  deleteProductById
} = require('../Controllers/exchangeBook');
const { isAuthenticated } = require('../middleware/auth');

router.post('/create', 
  isAuthenticated,         
  productImage,            
  exchangeBookCreate 
);

router.get("/allProduct", getAllProduct)
router.get("/:id/productId", getProductById)
router.delete("/:id/deleteId", deleteProductById)

module.exports = router;
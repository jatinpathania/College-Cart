const express = require("express");
const { createBookExchangeOrder, getAllExchangeBookOrder, deleteExchangeBookOrderById } = require("../Controllers/bookExchangeOrder");
const router = express.Router();

router.post("/:id/order-create-book-exchange", createBookExchangeOrder);
router.get("/allOrderBook", getAllExchangeBookOrder)
router.delete("/:id/deleteOrder",deleteExchangeBookOrderById)

module.exports = router
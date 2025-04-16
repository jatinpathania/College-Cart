const express = require("express");
const { createBookExchangeOrder, getAllExchangeBookOrder } = require("../Controllers/bookExchangeOrder");
const router = express.Router();

router.post("/:id/order-create-book-exchange", createBookExchangeOrder);
router.get("/allOrderBook", getAllExchangeBookOrder)

module.exports = router
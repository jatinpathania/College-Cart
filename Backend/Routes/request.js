const express = require("express");
const router = express.Router();

const  {createRequest, getAllRequest, deleteRequest}  = require("../Controllers/request");

router.post("/:id/request-handle",createRequest);
router.get("/allrequest",getAllRequest)
router.delete("/:id/deleteRequest",deleteRequest)

module.exports = router;
const express = require("express");
const router = express.Router();
const recordController = require("../controller/recordController");

// API endpoint to store product and order IDs
router.post("/records", recordController.createRecord);

module.exports = router;

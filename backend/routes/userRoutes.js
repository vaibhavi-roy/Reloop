const express = require("express");
const router = express.Router();
const recordController = require("../controller/recordController");
const returnController = require("../controller/returnController");
const exchangeController = require("../controller/exchangeController");
router.post("/return-request", returnController.createReturnRequest);
router.post("/exchange-request", exchangeController.createExchangeRequest);
router.post("/records", recordController.createRecord);

module.exports = router;

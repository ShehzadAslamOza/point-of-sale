const express = require("express");
const router = express.Router();
const { getReceipts, addReceipt } = require("../controllers/receiptController");

router.route("/").get(getReceipts);
router.route("/").post(addReceipt);

module.exports = router;

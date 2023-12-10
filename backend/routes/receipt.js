const express = require("express");
const router = express.Router();
const {
  getReceipts,
  addReceipt,
  deleteReceipt,
  getLastReceiptAPI,
} = require("../controllers/receiptController");

router.route("/").get(getReceipts);
router.route("/").post(addReceipt);
router.route("/:id").delete(deleteReceipt);
router.route("/recent").get(getLastReceiptAPI);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getReceipts,
  addReceipt,
  deleteReceipt,
} = require("../controllers/receiptController");

router.route("/").get(getReceipts);
router.route("/").post(addReceipt);
router.route("/:id").delete(deleteReceipt);

module.exports = router;

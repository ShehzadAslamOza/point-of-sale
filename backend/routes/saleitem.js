const express = require("express");
const router = express.Router();
const { getSaleItems } = require("../controllers/saleItemController");

router.route("/").get(getSaleItems);

module.exports = router;

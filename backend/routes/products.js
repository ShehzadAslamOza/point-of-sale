const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/").post(addProducts);

module.exports = router;

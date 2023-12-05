const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  getProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/").post(addProducts);
router.route("/:id").get(getProduct);

module.exports = router;

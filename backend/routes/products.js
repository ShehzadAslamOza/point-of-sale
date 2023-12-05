const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  getProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/").post(addProducts);
router.route("/:id").get(getProduct);
router.route("/").put(updateProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getSuppliers } = require("../controllers/suppliersController");

router.route("/").get(getSuppliers);

module.exports = router;

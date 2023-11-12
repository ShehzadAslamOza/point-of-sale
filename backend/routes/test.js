const express = require("express");
const router = express.Router();
const { testFunction } = require("../controllers/testController");

router.route("/").get(testFunction);

module.exports = router;

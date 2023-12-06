const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  logout,
  loggedIn,
  googleFailure,
} = require("../controllers/authController");

router.route("/logout").get(logout);
router.route("/google/failure").get(googleFailure);
router.route("/loggedIn").get(loggedIn);

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:8081/");
  }
);

module.exports = router;

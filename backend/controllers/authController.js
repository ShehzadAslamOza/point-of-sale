const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");

const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

const googleFailure = async (req, res) => {
  res.json({ error: "Something went wrong" });
};

const loggedIn = async (req, res) => {
  if (req.user) {
    res.json({ user: req.user._json });
  } else {
    res.json({ error: "Not logged in" });
  }
};

module.exports = { logout, googleFailure, loggedIn };

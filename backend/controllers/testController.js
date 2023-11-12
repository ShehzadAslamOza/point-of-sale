const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const testFunction = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Test route is working",
  });
});

module.exports = {
  testFunction,
};

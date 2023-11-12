require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();

// Port for the server
const PORT = process.env.PORT || 5000;

// Cross Origin Resource Sharing
app.use(cors());

// Express middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// The express.json() middleware is used to parse JSON data in the request body.
app.use(express.json());

// routes
app.use("/test", require("./routes/test"));
app.get("/", (req, res) => {
  res.send("Point of Sale");
});

// error handler
app.use(errorHandler);

// Server listening at PORT
app.listen(PORT, () => {
  console.log(
    `The server is listening at port ${PORT} (http://localhost:${PORT})`
  );
});

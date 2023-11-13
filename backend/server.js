require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("./utils/auth");
const passport = require("passport");
const app = express();

// Port for the server
const PORT = process.env.PORT || 5000;

// Cross Origin Resource Sharing
app.use(cors());

// Express middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// The express.json() middleware is used to parse JSON data in the request body.
app.use(express.json());

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// auth route
app.use("/auth", require("./routes/auth-route"));

////////////////////////////////////////////////////////////////////////////////////////////////////////
// DO MODIFICATION HERE
///////////////////////////////////////////////////////////////////////////////////////////////////////

// protected routes
app.use("/test", isLoggedIn, require("./routes/test"));
app.get("/", (req, res) => {
  res.send("Point of Sale");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////

// error handler
app.use(errorHandler);

// Server listening at PORT
app.listen(PORT, () => {
  console.log(
    `The server is listening at port ${PORT} (http://localhost:${PORT})`
  );
});

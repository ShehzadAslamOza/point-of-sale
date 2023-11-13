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
    res.sendStatus(401);
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

// routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong");
});

app.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send(`Hello ${name}!`);
});

app.use("/auth/logout", (req, res) => {
  req.session.destroy();
  res.send("You have logged out");
});

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

const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const registeredEmails = [
  "shehzadaslamoza@gmail.com",
  "haidercalculus@gmail.com",
  "haidercode@gmail.com",
  "muhammadshehzadaslamoza@gmail.com",
];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3002/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const userEmail = profile.emails[0].value;
      if (registeredEmails.includes(userEmail)) {
        // User is registered, proceed with authentication
        profile["EmployeeID"] = registeredEmails.indexOf(userEmail) + 1;
        return done(null, profile);
      } else {
        // User is not registered, reject authentication
        return done(null, false, { message: "Unauthorized email" });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

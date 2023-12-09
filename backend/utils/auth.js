// Changes By Haider

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const oracledb = require("oracledb");
require("dotenv").config();

let registeredEmails;

async function getRegisteredEmails() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: "localhost/orcl",
    });

    const query = "SELECT employee_email FROM Employees";
    const result = await connection.execute(query);
    registeredEmails = result.rows.map((row) => row[0]);

    return registeredEmails;
  } catch (error) {
    console.error("Error getting registered emails:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing database connection:", err.message);
      }
    }
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3002/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        if (!registeredEmails) {
          await getRegisteredEmails(); // Call the function to retrieve emails
        }

        const userEmail = profile.emails[0].value;
        if (registeredEmails.includes(userEmail)) {
          // User is registered, proceed with authentication
          profile["EmployeeID"] = registeredEmails.indexOf(userEmail) + 1;
          return done(null, profile);
        } else {
          // User is not registered, reject authentication
          return done(null, false, { message: "Unauthorized email" });
        }
      } catch (error) {
        return done(error);
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


module.exports = { getRegisteredEmails };


// const passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv").config();

// const registeredEmails = [
//   "shehzadaslamoza@gmail.com",
//   "haidercalculus@gmail.com",
//   "haidercode@gmail.com",
//   "muhammadshehzadaslamoza@gmail.com",
//   "hazimghulamfarooq19@gmail.com"
// ];

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3002/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       const userEmail = profile.emails[0].value;
//       if (registeredEmails.includes(userEmail)) {
//         // User is registered, proceed with authentication
//         profile["EmployeeID"] = registeredEmails.indexOf(userEmail) + 1;
//         return done(null, profile);
//       } else {
//         // User is not registered, reject authentication
//         return done(null, false, { message: "Unauthorized email" });
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

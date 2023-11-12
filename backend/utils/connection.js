const oracledb = require("oracledb");

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: "localhost/orcl",
    });
    return connection;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getConnection };

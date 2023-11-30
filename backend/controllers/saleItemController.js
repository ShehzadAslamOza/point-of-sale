const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { getConnection } = require("../utils/connection");

const getSaleItems = asyncHandler(async (req, res) => {
  let connection;

  let receiptID = req.query.receiptID;
  try {
    connection = await getConnection();
    const table = await connection.execute(
      "SELECT * from saleitems WHERE receiptId = :1",
      [receiptID]
    );
    // console.log(table.rows);
    res.status(200).json(table.rows);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
      } catch (error) {
        console.error("Error closing database connection:", error);
      }
    }
  }
});

module.exports = {
  getSaleItems,
};

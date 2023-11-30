const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { getConnection } = require("../utils/connection");

const getProducts = asyncHandler(async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const table = await connection.execute("SELECT * from products");
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

const addProducts = asyncHandler(async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const query = `INSERT INTO Products (ProductID, SupplierID, CategoryID, product_name, cost_price, selling_price, stock_quantity)
    VALUES (:1,:2, :3, :4, :5, :6, :7)`;
    const binds = [
      req.body.ProductID,
      req.body.SupplierID,
      req.body.CategoryID,
      req.body.product_name,
      req.body.cost_price,
      req.body.selling_price,
      req.body.stock_quantity,
    ];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };
    // console.log(query , "aaa----------->>>>")
    await connection.execute(query, binds, options);
    res.status(202).json({ msg: "Added" });
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
  getProducts,
  addProducts,
};

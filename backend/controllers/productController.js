const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { getConnection } = require("../utils/connection");

const getProduct = asyncHandler(async (req, res) => {
  let connection;

  const productId = req.params.id;

  try {
    connection = await getConnection();
    const table = await connection.execute(
      "SELECT * from Products WHERE ProductID = :1",
      [productId]
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
    res.status(500).json({ error: "Internal Server Error" });
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

const updateProduct = asyncHandler(async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const query = `UPDATE Products
    SET SupplierID = :1, CategoryID = :2, product_name = :3, cost_price = :4, selling_price = :5, stock_quantity = :6
    WHERE ProductID = :7`;
    const binds = [
      req.body.SupplierID,
      req.body.CategoryID,
      req.body.product_name,
      req.body.cost_price,
      req.body.selling_price,
      req.body.stock_quantity,
      req.body.ProductID,
    ];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };
    // console.log(query , "aaa----------->>>>")
    await connection.execute(query, binds, options);
    res.status(202).json({ msg: "Updated" });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  getProduct,
  updateProduct,
};

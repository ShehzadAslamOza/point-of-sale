const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const { getConnection } = require("../utils/connection");

const getReceipts = asyncHandler(async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const table = await connection.execute("SELECT * from receipts");
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

const getLastReceipt = asyncHandler(async () => {
  let connection;

  try {
    connection = await getConnection();
    const receiptID = await connection.execute(
      "SELECT ReceiptID FROM Receipts ORDER BY ReceiptID DESC FETCH FIRST 1 ROWS ONLY"
    );
    // console.log(table.rows);
    console.log(receiptID.rows[0][0]);
    return receiptID.rows[0][0];
  } catch (error) {
    console.error("Error executing SQL query:", error);
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

const callUpdatePointsProcedure = async (
  redeemedTicked,
  MembershipID,
  receiptID
) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(`BEGIN update_points(:1, :2, :3); END;`, [
      redeemedTicked,
      MembershipID,
      receiptID,
    ]);
    console.log("Points Updated");
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return 1;
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
        return 0;
      } catch (error) {
        console.error("Error closing database connection:", error);
        return 1;
      }
    }
  }
};

// const callUpdatePointsProcedure = async (
//   redeemedTicked,
//   MembershipID,
//   receiptID
// ) => {
//   let connection;
//   try {
//     connection = await getConnection();
//     // const query = `update_points(:1, :2, :3)`;
//     // const binds = [redeemedTicked, MembershipID, receiptID];
//     // const options = {
//     //   autoCommit: true, // Commit each insert immediately
//     // };

//     // console.log(query , "aaa----------->>>>")
//     await connection.execute(`BEGIN EXEC update_points(:1, :2, :3); END`, [
//       redeemedTicked,
//       MembershipID,
//       receiptID,
//     ]);
//     console.log("Points Updated");
//   } catch (error) {
//     console.error("Error executing SQL query:", error);
//     return 1;
//   } finally {
//     if (connection) {
//       try {
//         // Release the connection when done
//         await connection.close();
//         return 0;
//       } catch (error) {
//         console.error("Error closing database connection:", error);
//         return 1;
//       }
//     }
//   }
// };

const addReceipt = asyncHandler(async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const query = `INSERT INTO Receipts (EmployeeID, MembershipID, date_receipt, time_receipt, total_cost, total_sale, points_redeemed, points_received, sales_final)
    VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)`;
    const binds = [
      req.body.receipt.EmployeeID,
      req.body.receipt.MembershipID,
      req.body.receipt.date_receipt,
      req.body.receipt.time_receipt,
      req.body.receipt.total_cost,
      req.body.receipt.total_sale,
      req.body.receipt.points_redeemed,
      req.body.receipt.points_received,
      req.body.receipt.sales_final,
    ];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };
    // console.log(query , "aaa----------->>>>")

    await connection.execute(query, binds, options);

    let receiptID = await getLastReceipt();

    // for loop to add all the items in the receipt
    for (let i = 0; i < req.body.saleitems.length; i++) {
      await addSaleItem(
        receiptID,
        req.body.saleitems[i].ProductID,
        req.body.saleitems[i].quantity_purchased
      );
    }

    console.log(req.body.redeemTicked);
    await callUpdatePointsProcedure(
      req.body.redeemTicked,
      req.body.receipt.MembershipID,
      receiptID
    );
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

const addSaleItem = async (ReceiptID, ProductID, quantity_purchased) => {
  let connection;
  try {
    connection = await getConnection();
    const query = `INSERT INTO SaleItems (ReceiptID, ProductID, quantity_purchased)
    VALUES (:1, :2, :3)`;
    const binds = [ReceiptID, ProductID, quantity_purchased];
    const options = {
      autoCommit: true, // Commit each insert immediately
    };
    // console.log(query , "aaa----------->>>>")
    await connection.execute(query, binds, options);
    console.log("Added Sale Item");
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return 1;
  } finally {
    if (connection) {
      try {
        // Release the connection when done
        await connection.close();
        return 0;
      } catch (error) {
        console.error("Error closing database connection:", error);
        return 1;
      }
    }
  }
};

module.exports = {
  getReceipts,
  addReceipt,
};

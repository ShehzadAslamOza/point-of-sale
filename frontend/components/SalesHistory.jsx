import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const SalesHistory = () => {
  const [receipt, setReceipt] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const profitCalculation = () => {
    const totalSale = receipt.reduce((a, b) => a + b[6], 0);
    const totalCost = receipt.reduce((a, b) => a + b[5], 0);
    return totalSale - totalCost;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const receiptData = await axios.get("http://localhost:3002/api/receipt", {
        withCredentials: true,
      });

      receiptData.data.sort((a, b) => {
        return a[0] - b[0];
      });
      setReceipt(receiptData.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <h1 className=" text-4xl font-bold pb-5"> Sales History</h1>
        <div className="overflow-x-auto mt-4">
          <div className="flex justify-center mb-4">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div className="stat">
                <div className="stat-title">Total Receipts</div>
                <div className="stat-value text-center">{receipt.length}</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>
              <div className="stat">
                <div className="stat-title">Total Sale</div>
                <div className="stat-value">
                  Rs.
                  {
                    // sum of all the sales
                    receipt.reduce((a, b) => a + b[6], 0)
                  }
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
              <div className="stat bg-red-400">
                <div className="stat-title ">Total Cost</div>
                <div className="stat-value">
                  Rs.
                  {
                    // sum of all the cost prices
                    receipt.reduce((a, b) => a + b[5], 0)
                  }
                </div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>

              <div className="stat bg-green-300">
                <div className="stat-title">Profit on Sale Only</div>
                <div className="stat-value">
                  Rs.
                  {
                    // sum of all the sales
                    profitCalculation()
                  }
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
            </div>
          </div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th></th>
                <th>Receipt ID</th>
                <th>Employee ID</th>
                <th>Membership ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Total Cost</th>
                <th>Total Sale</th>
                <th>Points Redeemed</th>
                <th>Points Received</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {receipt.map((receipt) => {
                return (
                  <tr key={receipt[0]}>
                    <th></th>
                    <td>{receipt[0]}</td>
                    <td>{receipt[1]}</td>
                    <td>{receipt[2]}</td>
                    <td>{receipt[3]}</td>
                    <td>{receipt[4]}</td>
                    <td>{receipt[5]}</td>
                    <td>{receipt[6]}</td>
                    <td>{receipt[7]}</td>
                    <td>{receipt[8]}</td>
                    <td>{receipt[9]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default SalesHistory;

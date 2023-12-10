"use client";
import { useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

const Cart = ({ handleFormStep, cart, products, setCart, customers }) => {
  const { employeeID } = useContext(AuthContext);
  const [filteredCart, setFilteredCart] = useState([]);
  const [prevCart, setPrevCart] = useState([]);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [membershipID, setMembershipID] = useState(customers[0][0]);
  const [forceRedeem, setForceRedeem] = useState(false);
  const [total, setTotal] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  const handleMemberShipID = (e) => {
    setMembershipID(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (payAmount < total) {
      alert("Pay amount is less than total");
    } else {
      // todays date
      const today = new Date();
      const month = () => {
        let m = today.getMonth();
        if (m == 1) return "JAN";
        if (m == 2) return "FEB";
        if (m == 3) return "MAR";
        if (m == 4) return "APR";
        if (m == 5) return "MAY";
        if (m == 6) return "JUN";
        if (m == 7) return "JUL";
        if (m == 8) return "AUG";
        if (m == 9) return "SEP";
        if (m == 10) return "OCT";
        if (m == 11) return "NOV";
        if (m == 12) return "DEC";
      };
      const date = `${today.getDate()}-${month()}-${today.getFullYear()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const submitData = {
        receipt: {
          EmployeeID: employeeID,
          MembershipID: membershipID,
          date_receipt: date,
          time_receipt: time,
          total_cost: 0,
          total_sale: 0,
          points_redeemed: 0,
          points_received: 0,
          sales_final: 0,
        },
        saleitems: [],
        redeemTicked: redeemPoints,
      };

      filteredCart.forEach((product) => {
        submitData.saleitems.push({
          ProductID: product[0],
          quantity_purchased: product[7],
        });
      });

      // if sub total is 0 then dont send request
      if (submitData.saleitems.length === 0) {
        alert("Cart is empty");
      } else {
        const res = await axios.post(
          "http://localhost:3002/api/receipt",
          submitData,
          {
            withCredentials: true,
          }
        );

        if ("msg" in res.data) {
          alert("Purchase Successful");

          handleFormStep(1);
        } else {
          alert("MASLA HO GYA");
        }
      }

      filteredCart.forEach((product) => {
        // for each product check if it is in products
        const index = products.findIndex((item) => {
          return item[0] === product[0];
        });

        if (products[index][6] - product[7] < 10) {
          alert(
            "Stock is low for Product ID: " +
              product[0] +
              " (" +
              product[3] +
              ") Contact Supply Chain to reorder"
          );
        }
      });
    }

    // Send a POST request
  };

  const Total = (filtered, redeemPoints) => {
    let total = 0;
    filtered.forEach((product) => {
      total += parseInt(product[7]) * parseInt(product[5]);
    });

    if (redeemPoints) {
      total -= customers.filter((customer) => {
        return customer[0] === parseInt(membershipID);
      })[0][6];
    }

    if (total < 0) {
      total = 0;
    }

    setTotal(total);
    setPayAmount(total);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const productID =
      e.target.parentElement.parentElement.children[1].innerText;

    // update the value of the prouct in cart
    let tempCart = filteredCart;
    tempCart.forEach((product) => {
      if (product[0].toString() === productID) {
        console.log(product, value);
        product[7] = value;
      }
    });

    setFilteredCart([...tempCart]);
  };

  const redeemDisabled = () => {
    if (!redeemPoints) {
      return "border rounded w-1/4 py-2 px-3 bg-slate-300";
    } else {
      return "border rounded w-1/4 py-2 px-3";
    }
  };

  useEffect(() => {
    console.log("employee", employeeID);

    //force redeem points
    const temp = customers.filter((customer) => {
      return customer[0] === parseInt(membershipID);
    })[0][6];

    if (temp < 0) {
      setRedeemPoints(true);
      setForceRedeem(true);
    } else {
      setForceRedeem(false);
      setRedeemPoints(false);
    }

    // if all products in prev and current cart are same then do nothing/ dont check by length

    const filtered = products.filter((product) => {
      return cart.includes(product[0].toString());
    });

    // add quantity to filtered cart
    filtered.forEach((product) => {
      // check if product is already in filtered cart
      filteredCart.forEach((filteredProduct) => {
        if (filteredProduct[0] === product[0]) {
          product[7] = filteredProduct[7];
        }
      });

      // if not then add it
      if (!product[7]) {
        product[7] = 1;
      }
    });
    setFilteredCart(filtered);
    Total(filtered, redeemPoints);
  }, [cart, membershipID]);

  const handleRemove = (e) => {
    const product = e.target.parentElement.parentElement.children[1].innerText;
    let tempCart = cart;
    tempCart = tempCart.filter((item) => {
      return item !== product;
    });
    setCart(tempCart);
  };

  return (
    <div>
      <div className="overflow-y-auto min-h-[35vh] max-h-[35vh] m-4 p-1 border-2">
        <table className=" table table-sm">
          <thead>
            <tr>
              <th></th>
              <th>
                {/* <button onClick={(e) => handleSort(e)}>Product ID</button> */}
                Product ID
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.map((product) => {
              return (
                <tr key={product[0]}>
                  <th></th>
                  <td>{product[0]}</td>
                  <td>{product[3]}</td>

                  <td>{product[5]}</td>
                  <td>
                    <select
                      id="ProductQuantity"
                      name="ProductQuantity"
                      placeholder="Quantity"
                      value={product[7]}
                      onChange={handleInputChange}
                      className="border rounded w-full py-2 px-3"
                    >
                      {Array.from(Array(product[6]).keys()).map((i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>{parseInt(product[7]) * parseInt(product[5])}</td>
                  <td>
                    <button
                      onClick={(e) => handleRemove(e)}
                      className=" btn btn-error text-white font-bold"
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Add a selecter to select customer id */}
      <div className="flex justify-end align-bottom items-center gap-4 m-4">
        <label className="text-md font-semibold ">Membership ID</label>
        <select
          id="CustomerID"
          name="CustomerID"
          placeholder="Customer ID"
          className="border rounded w-1/4 py-2 px-3"
          onChange={(e) => handleMemberShipID(e)}
        >
          {customers.map((customer) => {
            return (
              <option key={customer[0]} value={customer[0]}>
                {customer[0]}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-end align-bottom items-center gap-4 m-4">
        <h2 className="text-md font-semibold ">Sub total</h2>
        <h2 className="border rounded w-1/4 py-2 px-3">
          {filteredCart.reduce((acc, product) => {
            return acc + parseInt(product[7]) * parseInt(product[5]);
          }, 0)}
        </h2>
      </div>
      <div className="flex justify-end align-bottom items-center gap-4 m-4">
        {/* Add a checkbox */}

        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600"
          id="redeemPoints"
          name="redeemPoints"
          value={redeemPoints}
          checked={redeemPoints}
          disabled={forceRedeem}
          onChange={(e) => {
            setRedeemPoints(e.target.checked);
            Total(filteredCart, e.target.checked);
          }}
        />
        <label className="text-md font-semibold ">Redeem Points </label>
        <h2 className={redeemDisabled()}>
          {
            customers.filter((customer) => {
              return customer[0] === parseInt(membershipID);
            })[0][6]
          }
        </h2>
      </div>
      <div className="flex ju">
        <div className="flex justify-end align-bottom items-center gap-4 m-4 flex-grow">
          <h2 className="text-md font-semibold ">Pay</h2>
          <input
            onChange={(e) => {
              setPayAmount(e.target.value);
            }}
            value={payAmount}
            className="border rounded w-1/2 py-2 px-3"
            type="number"
          />
        </div>
        <div className="flex justify-end align-bottom items-center gap-4 m-4 flex-grow">
          <h2 className="text-md font-semibold ">Return</h2>
          <h2 className="border rounded w-full py-2 px-3">
            {payAmount - total}
          </h2>
        </div>
        <div className="flex justify-end align-bottom items-center gap-4 m-4 flex-grow">
          <h2 className="text-md font-semibold ">Total</h2>
          <h2 className="border rounded w-full py-2 px-3">{total}</h2>
        </div>
      </div>
      <div className="flex justify-center align-bottom items-center gap-4 m-4">
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn btn-success w-1/4 py-2 px-3 text-white"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

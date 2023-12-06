"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Cart = ({ cart, products, setCart, customers }) => {
  const [filteredCart, setFilteredCart] = useState([]);
  const [prevCart, setPrevCart] = useState([]);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [membershipID, setMembershipID] = useState(customers[0][0]);

  const handleMemberShipID = (e) => {
    setMembershipID(e.target.value);
    console.log(e.target.value);
  };

  const Total = () => {
    let total = 0;
    filteredCart.forEach((product) => {
      total += parseInt(product[7]) * parseInt(product[5]);
    });

    if (redeemPoints) {
      total -= customers.filter((customer) => {
        return customer[0] === parseInt(membershipID);
      })[0][6];
    }
    return total;
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
  }, [cart]);

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
      <div className="overflow-y-auto min-h-[40vh] max-h-[40vh] m-4 p-1 border-2">
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
          onChange={(e) => setRedeemPoints(e.target.checked)}
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
      <div className="flex justify-end align-bottom items-center gap-4 m-4">
        <h2 className="text-md font-semibold ">Total</h2>
        <h2 className="border rounded w-1/4 py-2 px-3">{Total()}</h2>
      </div>
    </div>
  );
};

export default Cart;

"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Cart = ({ cart, products, setCart }) => {
  const [filteredCart, setFilteredCart] = useState([]);
  const [prevCart, setPrevCart] = useState([]);

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
      <div className="overflow-y-auto max-h-[40vh] m-4 p-1 border-2">
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
    </div>
  );
};

export default Cart;

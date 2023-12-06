"use client";
import React from "react";
import ProductSearch from "./ProductSearch";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Cart from "./Cart";

const POS = ({ handleFormStep }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [customers, setCustomers] = useState([]);

  const addToCart = (e) => {
    // extract product id from e.target
    const product = e.target.parentElement.parentElement.children[1].innerText;

    let tempCart = cart;
    tempCart.push(product);
    tempCart = [...new Set(tempCart)];
    setCart(tempCart);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const productsData = await axios.get(
        "http://localhost:3002/api/products",
        {
          withCredentials: true,
        }
      );

      const categoriesData = await axios.get(
        "http://localhost:3002/api/category",
        {
          withCredentials: true,
        }
      );

      const customersData = await axios.get(
        "http://localhost:3002/api/customers",
        {
          withCredentials: true,
        }
      );

      setCustomers(customersData.data);
      setCategories(categoriesData.data);
      setProducts(productsData.data);
      setFilteredProducts(productsData.data.slice(0, 8));
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
      <div>
        <h2 className="text-2xl font-semibold mb-4">POS</h2>
        <div className="grid grid-cols-2">
          <div>
            <ProductSearch
              products={products}
              categories={categories}
              addToCart={addToCart}
            />
          </div>
          <div className="border-2 h-[80vh]">
            <Cart
              cart={cart}
              products={products}
              setCart={setCart}
              customers={customers}
              handleFormStep={handleFormStep}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default POS;

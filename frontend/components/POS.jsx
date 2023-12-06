import React from "react";
import ProductSearch from "./ProductSearch";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

      console.log(categoriesData.data);
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
            <ProductSearch products={products} categories={categories} />
          </div>
          <div className="border-2 h-[80vh]">See cart</div>
        </div>
      </div>
    );
  }
};

export default POS;

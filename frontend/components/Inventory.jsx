"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const Inventory = ({ handleFormStep }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleEdit = (e) => {
    // Save product id to local storage
    localStorage.setItem(
      "product_id",
      e.target.parentElement.parentElement.children[1].innerText
    );
    handleFormStep(5);
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

      console.log(categoriesData.data);
      setCategories(categoriesData.data);
      setProducts(productsData.data);
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
        <h1 className=" text-4xl font-bold pb-5"> Inventory</h1>
        <div className="overflow-x-auto mt-4">
          <div className="flex justify-end mr-16">
            <button
              onClick={() => handleFormStep(2)}
              className="btn btn-neutral"
            >
              Add Product
            </button>
          </div>
          <table className="table table-md">
            <thead>
              <tr>
                <th></th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Stock Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product[0]}>
                    <th></th>
                    <td>{product[0]}</td>
                    <td>{product[3]}</td>
                    <td>
                      {
                        categories.filter(
                          (category) => category[0] === product[2]
                        )[0][1]
                      }
                    </td>
                    <td>{product[4]}</td>
                    <td>{product[5]}</td>
                    <td>{product[6]}</td>
                    <td>
                      <button
                        onClick={(e) => handleEdit(e)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-error">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="stats border-2 mt-4 ">
            <div className="stat">
              <div className="stat-title">Total Products</div>
              <div className="stat-value text-center">{products.length}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Inventory;

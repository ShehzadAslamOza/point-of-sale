import React, { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";

import axios from "axios";

const AddProduct = ({ handleFormStep }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const categoriesData = await axios.get(
        "http://localhost:3002/api/category",
        {
          withCredentials: true,
        }
      );

      const suppliersData = await axios.get(
        "http://localhost:3002/api/suppliers",
        {
          withCredentials: true,
        }
      );

      const productsData = await axios.get(
        "http://localhost:3002/api/products",
        {
          withCredentials: true,
        }
      );

      setProducts(productsData.data);
      setCategories(categoriesData.data);
      setSuppliers(suppliersData.data);
      console.log(suppliersData.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // State variables to store form data and validation errors
  const [formData, setFormData] = useState({
    ProductID: "",
    SupplierID: "1",
    product_name: "",
    cost_price: "",
    selling_price: "",
    stock_quantity: "",
    CategoryID: "1",
  });

  const [errors, setErrors] = useState({
    ProductID: "",
    SupplierID: "",
    product_name: "",
    cost_price: "",
    selling_price: "",
    stock_quantity: "",
    CategoryID: "",
  });

  // Update the state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the corresponding validation error when the user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Check if each field is not blank
    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = `${key} cannot be blank`;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (validateForm()) {
      // Add your logic to send the data to the server or perform other actions
      console.log("Form submitted:", formData);

      // make sure product id is unique
      for (const product of products) {
        if (product[0] === parseInt(formData.ProductID)) {
          alert("Product ID already exists");
          return;
        }
      }

      // Send a POST request
      const res = await axios.post(
        "http://localhost:3002/api/products",
        formData,
        {
          withCredentials: true,
        }
      );

      if ("msg" in res.data) {
        alert("Product Added Successfully");
        setFormData({
          ProductID: "",
          SupplierID: "",
          product_name: "",
          cost_price: "",
          selling_price: "",
          stock_quantity: "",
          CategoryID: "",
        });

        handleFormStep(1);
      } else {
        alert("MASLA HO GYA");
      }

      // For demonstration purposes, let's clear the form data after submission
    } else {
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="w-full  mt-8">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form
          className="w-full mx-auto bg-white p-8 border rounded shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Product ID */}
          <div className="mb-4">
            <label
              htmlFor="ProductID"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product ID
            </label>
            <input
              type="number"
              id="ProductID"
              name="ProductID"
              value={formData.ProductID}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Product ID"
            />
            {errors.ProductID && (
              <p className="text-red-500">{errors.ProductID}</p>
            )}
          </div>

          {/* Supplier ID */}
          <div className="mb-4">
            <label
              htmlFor="SupplierID"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Supplier Name
            </label>
            <select
              id="SupplierID"
              name="SupplierID"
              placeholder="Select Supplier"
              value={formData.SupplierID}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
            >
              {/* Add your supplier options here */}
              {suppliers.map((supplier) => {
                return (
                  <option key={supplier[0]} value={supplier[0]}>
                    {supplier[1]}
                  </option>
                );
              })}
            </select>
            {errors.SupplierID && (
              <p className="text-red-500">{errors.SupplierID}</p>
            )}
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Product Name"
            />
            {errors.product_name && (
              <p className="text-red-500">{errors.product_name}</p>
            )}
          </div>

          {/* Cost Price */}
          <div className="mb-4">
            <label
              htmlFor="cost_price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cost Price
            </label>
            <input
              type="number"
              id="cost_price"
              name="cost_price"
              value={formData.cost_price}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Cost Price"
              min="1"
            />
            {errors.cost_price && (
              <p className="text-red-500">{errors.cost_price}</p>
            )}
          </div>

          {/* Selling Price */}
          <div className="mb-4">
            <label
              htmlFor="selling_price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Selling Price
            </label>
            <input
              type="number"
              id="selling_price"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Selling Price"
              min="1"
            />
            {errors.selling_price && (
              <p className="text-red-500">{errors.selling_price}</p>
            )}
          </div>

          {/* Stock Quantity */}
          <div className="mb-4">
            <label
              htmlFor="stock_quantity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock_quantity"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Stock Quantity"
              min="11"
              max="100"
            />
            {errors.stock_quantity && (
              <p className="text-red-500">{errors.stock_quantity}</p>
            )}
          </div>

          {/* Category ID */}
          <div className="mb-4">
            <label
              htmlFor="CategoryID"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <select
              id="CategoryID"
              name="CategoryID"
              placeholder="Select Category"
              value={formData.CategoryID}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3"
            >
              {/* Add your category options here */}
              {categories.map((category) => {
                return (
                  <option key={category[0]} value={category[0]}>
                    {category[1]}
                  </option>
                );
              })}
            </select>
            {errors.CategoryID && (
              <p className="text-red-500">{errors.CategoryID}</p>
            )}
          </div>

          {/* Display validation errors
        <div className="text-red-500 mb-4">
          {Object.values(errors).map(
            (error, index) => error && <p key={index}>{error}</p>
          )}
        </div> */}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default AddProduct;

import React from "react";

const AddProduct = () => {
  return (
    <div className="w-full  mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form className="w-full mx-auto bg-white p-8 border rounded shadow-md">
        {/* Product ID */}
        <div className="mb-4">
          <label
            htmlFor="productId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter Product ID"
          />
        </div>

        {/* Supplier ID */}
        <div className="mb-4">
          <label
            htmlFor="supplierId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Supplier ID
          </label>
          <select
            id="supplierId"
            name="supplierId"
            className="border rounded w-full py-2 px-3"
          >
            {/* Add your supplier options here */}
            <option value="supplier1">Supplier 1</option>
            <option value="supplier2">Supplier 2</option>
          </select>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter Product Name"
          />
        </div>

        {/* Cost Price */}
        <div className="mb-4">
          <label
            htmlFor="costPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cost Price
          </label>
          <input
            type="number"
            id="costPrice"
            name="costPrice"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter Cost Price"
          />
        </div>

        {/* Selling Price */}
        <div className="mb-4">
          <label
            htmlFor="sellingPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Selling Price
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter Selling Price"
          />
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label
            htmlFor="stockQuantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            className="border rounded w-full py-2 px-3"
            placeholder="Enter Stock Quantity"
          />
        </div>

        {/* Category ID */}
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category ID
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="border rounded w-full py-2 px-3"
          >
            {/* Add your category options here */}
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>

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
};

export default AddProduct;

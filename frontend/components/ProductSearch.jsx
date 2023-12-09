"use client";
import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const ProductSearch = ({ products, categories, addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilteredProducts = (e) => {
    // nothing in search bar then show all products
    // else search on basis of all fields

    let filtered = products.filter((product) => {
      return (
        product[0].toString().includes(e.target.value) ||
        product[3].toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    // only show 10 products

    setFilteredProducts(filtered);
  };

  // const handleEdit = (e) => {
  //   // Save product id to local storage
  //   localStorage.setItem(
  //     "product_id",
  //     e.target.parentElement.parentElement.children[1].innerText
  //   );
  //   handleFormStep(5);
  // };

  // const handleSort = (e) => {
  //   const sorted = [...filteredProducts].sort((a, b) => {
  //     return a[0] - b[0];
  //   });
  //   setFilteredProducts(sorted);
  // };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // const productsData = await axios.get(
      //   "http://localhost:3002/api/products",
      //   {
      //     withCredentials: true,
      //   }
      // );

      // const categoriesData = await axios.get(
      //   "http://localhost:3002/api/category",
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log(categoriesData.data);
      // setCategories(categoriesData.data);
      // setProducts(productsData.data);
      setFilteredProducts(products);
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
        <div className="overflow-auto ">
          <div className="flex justify-center w-full p-0 m-0">
            <input
              onChange={(e) => handleFilteredProducts(e)}
              className="input input-bordered w-10/12"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            <table className="table table-sm mt-4">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    {/* <button onClick={(e) => handleSort(e)}>Product ID</button> */}
                    Product ID
                  </th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
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
                      <td>{product[5]}</td>
                      <td>{product[6] == 0 ? "Out of Stock" : product[6]}</td>
                      <td>
                        <button
                          onClick={(e) => addToCart(e)}
                          className=" btn btn-success text-white font-bold"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductSearch;

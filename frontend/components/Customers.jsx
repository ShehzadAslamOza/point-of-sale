"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const Customers = ({ handleFormStep }) => {
  const [Customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleFilteredCustomers = (e) => {
    // nothing in search bar then show all Customers
    // else search on basis of all fields

    const filtered = Customers.filter((product) => {
      return (
        product[0].toString().includes(e.target.value) ||
        product[1].toLowerCase().includes(e.target.value.toLowerCase()) ||
        product[2].toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredCustomers(filtered);
  };

  const handleEdit = (e) => {
    // Save product id to local storage
    localStorage.setItem(
      "product_id",
      e.target.parentElement.parentElement.children[1].innerText
    );
    handleFormStep(5);
  };

  // const handleSort = (e) => {
  //   const sorted = [...filteredCustomers].sort((a, b) => {
  //     return a[0] - b[0];
  //   });
  //   setFilteredCustomers(sorted);
  // };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const CustomersData = await axios.get(
        "http://localhost:3002/api/customers",
        {
          withCredentials: true,
        }
      );

      setCustomers(CustomersData.data);
      setFilteredCustomers(CustomersData.data);
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
        <h1 className=" text-4xl font-bold pb-5"> Customers</h1>
        <div className="overflow-x-auto mt-4">
          <div className="flex justify-end mr-16">
            <input
              onChange={(e) => handleFilteredCustomers(e)}
              className="input input-bordered"
              type="text"
              placeholder="Search"
            />
          </div>
          <table className="table table-md">
            <thead>
              <tr>
                <th></th>
                <th>Membership ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((product) => {
                return (
                  <tr key={product[0]}>
                    <th></th>
                    <td>{product[0]}</td>
                    <td>{product[1] + " " + product[2]}</td>
                    <td>{product[3]}</td>
                    <td>{product[4]}</td>
                    <td>{product[5]}</td>
                    <td>{product[6]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="stats border-2 mt-4 ">
            <div className="stat">
              <div className="stat-title">Total Customers</div>
              <div className="stat-value text-center">
                {filteredCustomers.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Customers;

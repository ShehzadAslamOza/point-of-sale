"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";

const Dashboard = () => {
  const { user, loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!loggedIn) router.push("/");
    else {
      const fetchUser = async () => {
        const res = await axios.get("http://localhost:3002/test", {
          withCredentials: true,
        });
        setTestData(res.data);
        console.log(res.data);
        setLoading(false);
      };

      fetchUser();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <h1>
          <b>Hello {user?.name}</b>
        </h1>

        {testData.map((data) => {
          return <p key={data[0]}>{data[0] + " " + data[1] + " " + data[2]}</p>;
        })}
      </>
    );
  }
};

export default Dashboard;

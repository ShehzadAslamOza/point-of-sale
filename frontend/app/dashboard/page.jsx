"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import Drawer from "@/components/Drawer";
import Inventory from "@/components/Inventory";
import SalesHistory from "@/components/SalesHistory";
import POS from "@/components/POS";
import AddProduct from "@/components/AddProduct";

const Dashboard = () => {
  const { user, loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const router = useRouter();

  const handleFormStep = (step) => {
    setFormStep(step);
  };

  const getCurrentStep = () => {
    switch (formStep) {
      case 1:
        return <Inventory handleFormStep={handleFormStep} />;
      case 2:
        return <AddProduct />;
      case 3:
        return <SalesHistory />;
      case 4:
        return <POS />;
    }
  };

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
  }, [formStep]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-4">
          <Drawer handleFormStep={handleFormStep} />
          <div className="col-span-3">{getCurrentStep()}</div>
        </div>
      </>
    );
  }
};

export default Dashboard;

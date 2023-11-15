"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";

const Dashboard = () => {
  const { user, loggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!loggedIn) router.push("/");
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return <h1>Hello {user?.name}</h1>;
  }
};

export default Dashboard;

"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

import axios from "axios";

export default function SignIn() {
  const { user, loggedIn, setUser, setLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:3002/auth/loggedIn", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.user) {
        setUser(res.data.user);
        setLoggedIn(true);
        router.push("/dashboard");
      }
      setLoading(false);
    };

    if (loggedIn) router.push("/dashboard");
    fetchUser();
  }, [loggedIn]);

  const handleLogin = async () => {
    router.push("http://localhost:3002/auth/google");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center text-blue h-screen">
        <ImSpinner9 className="h-10 w-10 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col items-center justify-center h-[92vh] overflow-hidden">
        <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Employee Login
          </h1>
          <div className="flex items-center justify-center mt-6 dark:bg-gray-800">
            <button
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              onClick={handleLogin}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

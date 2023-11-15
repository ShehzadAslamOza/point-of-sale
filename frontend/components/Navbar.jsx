"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const { user, loggedIn, setUser, setLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3002/auth/logout", {
      withCredentials: true,
    });
    console.log(res);
    setUser(null);
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Point of Sale</a>
      </div>
      {loggedIn && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.picture} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
            >
              <li>
                <a className="justify-between">{user?.email}</a>
              </li>

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

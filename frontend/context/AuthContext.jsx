"use client";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [employeeID, setEmployeeID] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3002/auth/loggedIn");
      if ("user" in res) {
        console.log(res);
        setUser(res.user);
        setEmployeeID(res.EmployeeID);
        setLoggedIn(true);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        employeeID,
        setEmployeeID,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

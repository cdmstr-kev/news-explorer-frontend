import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authorize } from "../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  const [loginErrors, setLoginErrors] = useState("");

  const handleSignIn = (user) => {
    const { email, password } = user;

    return authorize(email, password)
      .then((res) => {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setLoginErrors("");
        return res;
      })
      .catch((err) => {
        console.error("Failed to authorize user:", err);
        setLoginErrors("Invalid credentials. Please try again.");
        throw err;
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const value = {
    isLoggedIn,
    currentUser,
    loginErrors,
    setLoginErrors,
    handleSignIn,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

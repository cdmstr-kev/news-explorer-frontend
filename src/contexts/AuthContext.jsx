import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getCurrentUser } from "../utils/auth.js";
import { AuthContext } from "./auth-context.js";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("null");
  const [loginErrors, setLoginErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoading(true);
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);

          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
          setIsLoading(false);
        });
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleSignup = (userData) => {
    setIsLoading(true);
    setLoginErrors("");

    return register(userData)
      .then((res) => {
        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsLoading(false);
        return user;
      })
      .catch((err) => {
        console.error("Failed to register user:", err);
        setLoginErrors(err.message || "Registration failed. Please try again.");
        setIsLoading(false);
        throw err;
      });
  };

  const handleSignIn = (user) => {
    setIsLoading(true);
    setLoginErrors("");
    const { email, password } = user;

    return login(email, password)
      .then(() => {
        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setIsLoading(false);
        return user;
      })
      .catch((err) => {
        console.error("Failed to authorize user:", err);
        setLoginErrors(err.message || "Invalid credentials. Please try again.");
        setIsLoading(false);
        throw err;
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const value = {
    isLoggedIn,
    currentUser,
    loginErrors,
    isLoading,
    setIsLoading,
    setLoginErrors,
    handleSignIn,
    handleSignOut,
    handleSignup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

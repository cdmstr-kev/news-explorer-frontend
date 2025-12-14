import { validateUserCredentials, saveUserToStorage } from "./helpers.js";

export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = validateUserCredentials(email, password);

    if (!user) {
      return reject(new Error("Invalid Credentials"));
    }

    resolve({
      token: `fake-token-${Date.now()}`,
      user: user,
    });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      resolve({ valid: true });
    } else {
      reject(new Error("Invalid token"));
    }
  });
};

export const register = (userData) => {
  return new Promise((resolve) => {
    saveUserToStorage(userData);
    resolve({
      message: "Registration successful",
      user: userData,
    });
  });
};

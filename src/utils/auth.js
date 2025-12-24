const backendBaseUrl = import.meta.env.PROD
  ? "https://api.newsexplorer.cdmstr.com"
  : import.meta.env.VITE_BACKEND_API_URL;

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  try {
    const data = await res.json();
    const error = new Error(
      data.message || `HTTP ${res.status}: ${res.statusText}`
    );
    error.status = res.status;
    throw error;
  } catch (err) {
    if (err.message && !err.message.includes("Unexpected")) {
      throw err;
    }
    const error = new Error(`HTTP ${res.status}: ${res.statusText}`);
    error.status = res.status;
    throw error;
  }
};

export const login = (email, password) => {
  return fetch(`${backendBaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }
      return data;
    });
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return Promise.reject(new Error("No token found"));
  }

  return fetch(`${backendBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const checkToken = () => {
  return getCurrentUser;
};

export const register = (userData) => {
  const { email, password, username } = userData;

  return fetch(`${backendBaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};

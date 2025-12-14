import { BrowserRouter } from "react-router-dom";
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthContext, AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

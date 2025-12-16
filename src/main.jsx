import { HashRouter } from "react-router-dom";
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NewsProvider } from "./contexts/NewsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ModalProvider>
        <AuthProvider>
          <NewsProvider>
            <App />
          </NewsProvider>
        </AuthProvider>
      </ModalProvider>
    </HashRouter>
  </React.StrictMode>
);

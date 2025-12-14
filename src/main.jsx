import { BrowserRouter } from "react-router-dom";
import React from "react";

import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.css";
import { ModalProvider } from "./contexts/ModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

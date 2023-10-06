import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AdminProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AdminProvider>
  </BrowserRouter>
);

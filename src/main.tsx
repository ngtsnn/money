import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import Router from "routes/index.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);

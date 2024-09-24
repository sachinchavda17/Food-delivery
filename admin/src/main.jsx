import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./utils/StoreContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContextProvider>
  </StrictMode>
);

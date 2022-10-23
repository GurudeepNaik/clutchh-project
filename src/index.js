import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/useContext";
import Routing from "./Routes/Routes";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Routing/>
    </ContextProvider>
  </React.StrictMode>
);

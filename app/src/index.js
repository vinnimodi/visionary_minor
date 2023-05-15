import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dataprovider from "./context/DataProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Dataprovider>
      <App />
    </Dataprovider>
  </Router>
);

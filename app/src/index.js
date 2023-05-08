import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dataprovider from "./context/DataProvider";
// import { useEffect, useState } from "react";
// import { prisma } from "./db";

// import Button from '@mui/material/Button';

// export default function MyApp() {
//   return (
//     <div>
//       hello
//       <Button variant="contained">Hello World</Button>
//     </div>
//   );
// }
// const [products, setProducts] = useState([]);
// useEffect(() => {
//   const getProducts = async () => {
//     try {
//       const data = JSON.stringify(
//         await prisma.items.findMany({
//           where: {
//             Category: name,
//           },
//         })
//       );
//       setProducts(JSON.parse(data.data));
//     } catch (err) {
//       console.info(err);
//     }
//   };
//   getProducts();
// }, [name, products]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Dataprovider>
    <App />
    </Dataprovider>
  </Router>
);

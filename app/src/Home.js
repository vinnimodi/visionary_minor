import React, { useContext } from "react";
import { CategoryContext } from "./App";
import "./App.css";
import Container from "./Container.js";
import "./index.css";
import Navbar from "./navbar";
export default function Home() {
  const { setCat } = useContext(CategoryContext);
  setCat(null);
  const items = [
    "Fruits & Vegetables",
    "Dairy",
    "Daily Essentials",
    "Beverages",
    "Personal Care",
    "Cleaning & Household",
  ];

  return (
    <div className="App">
      <Navbar />
      <main className={"main"}>
        {items.map((item, index) => {
          return <Container key={index} name={item} />;
        })}
      </main>
    </div>
  );
}

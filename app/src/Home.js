import React, { useContext } from "react";
import { CategoryContext } from "./App";
import "./App.css";
import Container from "./Container.js";
import "./index.css";
import Navbar from "./navbar";
import { useSearchParams } from "react-router-dom";
import { DataContext } from "./context/DataProvider";

export default function Home() {
  const {account} = useContext(DataContext)
  const [searchParams, ] = useSearchParams();
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
  
if(searchParams?.has("session_id")){
  account.Cart = [];
  return(
    <div className="App">
      <Navbar />
        Payment Successful
        <main className={"main"}>
        {items.map((item, index) => {
          return <Container key={index} name={item} />;
        })}
      </main>
    </div>
  )
}
  else
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

import ProductCard from "./card";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { useContext, useEffect, useState } from "react";
import "./cat.css";
import { CategoryContext } from "./App";

export default function Search() {
  const { setCat } = useContext(CategoryContext);
  const { name } = useParams();
  setCat(name);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://visionary-api.onrender.com/products");
      const data = await response.json();
      setProducts(
        data.filter(
          (item) => item.Category.toLowerCase() === name.toLowerCase()
        )
      );
    };
    getProducts();
  }, [name]);

  return (
    <>
      <Navbar />
      {/* <button className="back" onClick={() => router.back()}>
          Back
        </button> */}
      <h1 className={"heading"}>{name}</h1>
      <div className="grid">
        {products.map((item) => (
          <ProductCard item={item} key={item.Title} />
        ))}
      </div>
    </>
  );
}

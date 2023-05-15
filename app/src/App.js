import { Routes, Route } from "react-router-dom";
import Category from "./Category";
import About from "./about";
import Home from "./Home";
import Contact from "./contact";
import { createContext, useEffect, useState } from "react";
import useAlan from "./useAlan.js";
import Cart from "./cart";
import Search from "./Search";
export const CategoryContext = createContext(null);

function App() {
  const [cat, setCat] = useState(null);
  useEffect(() => {
    if (cat !== null) {
      document.title = cat;
    } else {
      document.title = "Home";
    }
  }, [cat]);


  useAlan();

  
  return (
      <CategoryContext.Provider value={{ setCat, cat }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </CategoryContext.Provider>
  );
}

export default App;

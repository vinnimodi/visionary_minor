import { Routes, Route } from "react-router-dom";
import Category from "./Category.js";
// import Navbar from "./navbar";
import About from "./about";
import Home from "./Home.js";
import Contact from "./contact.js";
import { createContext, useEffect, useState } from "react";
import useAlan from "./useAlan.js";
export const CategoryContext = createContext();

function App() {
  const [cat, setCat] = useState(null);

  useEffect(() => {
    console.log(cat);
    if (cat !== null) {
      document.title = cat;
    } else {
      document.title = "Home";
    }
  }, [cat]);
  useAlan();
  return (
    <>
      <CategoryContext.Provider value={{ setCat, cat }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </CategoryContext.Provider>
    </>
  );
}

export default App;

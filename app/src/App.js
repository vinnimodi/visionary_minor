import { Routes, Route } from 'react-router-dom';
import Category from './Category';
// import Navbar from "./navbar";
import About from './about';
import Home from './Home';
import Contact from './contact';
import { createContext, useEffect, useState } from 'react';
import useAlan from './useAlan.js';
import Dataprovider from './context/DataProvider';
//import Dataprovider from './context/DataProvider';
export const CategoryContext = createContext(null);

function App() {
  const [cat, setCat] = useState(null);
  useEffect(() => {
    console.log(cat);
    if (cat !== null) {
      document.title = cat;
    } else {
      document.title = 'Home';
    }
  }, [cat]);
  useAlan();
  return (
    <Dataprovider>
      <CategoryContext.Provider value={{ setCat, cat }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </CategoryContext.Provider>
    </Dataprovider>
  );
}

export default App;

import React, { useContext } from "react";
import { CategoryContext } from "./App.js";
import Navbar from "./navbar.js";
function About() {
  const { setCat } = useContext(CategoryContext);
  setCat(null);
  return (
    <div>
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap");
          h1 {
            text-align: center;
            margin-top: 4rem;
            font-size: 2rem;
            font-weight: 600;
            color: #333;
            font-family: "Roboto";
          }
          p {
            font-family: "Roboto";
            font-size: 1.2rem;
            margin: 3rem 4rem;
          }
        `}
      </style>
      <Navbar />
      <h1>About Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        quibusdam accusantium explicabo eligendi totam quisquam non pariatur ea
        excepturi at debitis necessitatibus ipsa a, similique asperiores
        corrupti libero labore cumque?
      </p>
    </div>
  );
}

export default About;

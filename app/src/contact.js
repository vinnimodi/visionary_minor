import Navbar from "./navbar.js";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
// import { spacing } from "@mui/system";
function Contact() {
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
      <h1>Contact Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        quibusdam accusantium explicabo eligendi totam quisquam non pariatur ea
        excepturi at debitis necessitatibus ipsa a, similique asperiores
        corrupti libero labore cumque?
        <div
          style={{
            marginTop: "2rem",
            alignItems: "center",
            color: "navy"
          }}
        >
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
        </div>
      </p>
    </div>
  );
}

export default Contact;

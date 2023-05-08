import express from "express";
import {
  userSignUp,
  userLogin,
  addToCart,
  changeCart,
  checkCart,
  checkOut
} from "../controller/userController.js";
const Router = express.Router();
Router.post("/signup", userSignUp);
Router.post("/login", userLogin);
Router.post("/add", addToCart);
Router.post("/change", changeCart);
Router.post("/check", checkCart);
Router.post("/checkout",checkOut);
export default Router;

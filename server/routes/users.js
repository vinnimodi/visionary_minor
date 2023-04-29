import express from "express";
import {
  userSignUp,
  userLogin,
  addToCart
} from "../controller/userController.js";
const Router = express.Router();
Router.post("/signup", userSignUp);
Router.post("/login", userLogin);
Router.post("/add", addToCart);
export default Router;

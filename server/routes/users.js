import express from 'express';
import { userSignUp, userLogin } from '../controller/userController.js';
const Router = express.Router();
Router.post('/signup', userSignUp);
Router.post('/login', userLogin);
export default Router;

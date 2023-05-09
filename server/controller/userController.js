import Customer from "../models/user-schema.js";
import dotenv from "dotenv";
dotenv.config();
export const userSignUp = async (request, response) => {
  try {
    // to check if the username already exist
    const existUserName = await Customer.findOne({
      username: request.body.username
    });

    if (existUserName) {
      return response.status(401).json({ message: "username already exist" });
    }

    const existMobile = await Customer.findOne({
      MobileNumber: request.body.MobileNumber
    });

    if (existMobile) {
      return response
        .status(401)
        .json({ message: "MoblieNumber already exist" });
    }

    const existEmail = await Customer.findOne({
      email: request.body.email
    });

    if (existEmail) {
      return response.status(401).json({ message: "Email already exist" });
    }

    // if username entered is not existing one
    const customer = request.body;
    // taking the request body in customer variable
    const newCostumer = new Customer(customer);
    // creating an object of Customer type and intializing value with the request body

    // saving values in the data base
    await newCostumer.save();
    // giving status of acceptance to the user
    response.status(200).json({ message: customer });
  } catch (error) {
    // printing error respone
    response.status(500).json({ message: error });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let custo = await Customer.findOne({
      username: username,
      password: password
    });
    if (custo) {
      return response.status(200).json({ data: custo });
    } else {
      return response.status(401).json(`Invalid Login`);
    }
  } catch (error) {
    response.status(500).json(`error `, error.message);
  }
};

export const addToCart = async (request, response) => {
  try {
    const customer = await Customer.findById(request.body.account._id);
    const product = request.body.product;
    if (customer.Cart?.find((item) => item.product?._id === product?._id)) {
      customer.Cart.find((item) => item.product?._id === product?._id).quantity += 1;
      // await customer.save();
    } else
    customer.Cart.push({ ...product, quantity: 1 });
    console.log(customer.Cart);
    await customer.save();

    response.status(200).json({ message: customer });
  }
  catch (error) {
    response.status(404).json({message:error.message});
  }
};
export const changeCart = async (request, response) => {
  try {
    const customer = await Customer.findById(request.body.account._id);
    const product = request.body.product;
    const index = customer.Cart.findIndex((item) => item?.Title === product?.Title)
    console.log(product.quantity);
    if (index !== -1) {
      customer.Cart = customer.Cart.filter((item) =>item!==product);
      product.quantity += request.body.change;
      if(product.quantity===0) customer.Cart.splice(index,1);
      else customer.Cart.splice(index,1,product);
    }
    await customer.save();

    response.status(200).json({ message: customer });
  }
  catch (error) {
    console.error(error);
    response.status(500).json({message:error});
  }
};

export const checkCart = async (request, response) => {
try{
  const customer = await Customer.findById(request.body.account._id);
    const product = request.body.product;
    const dbProduct = customer.Cart.find((item) => item?.Title === product?.Title)
    if (dbProduct) {
      response.status(200).json({ qty: dbProduct.quantity });
    }
    else{
      response.status(200).json({ qty: 0});
    }

}
catch(error){
  response.status(500).json({message:error.message});
}
}
// const stripe = require('stripe')(process.env.STRIPE_KEY)
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);
export const checkOut = async (request, response) => {
  const customer = await Customer.findById(request.body.account._id);
    const products = request.body.products;
    customer.Cart = [];
    const session = await stripe.checkout.sessions.create({
      customer: customer._id,
      customer_creation:"always",
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.Title,
            },
            unit_amount: product.Price*100,
          },
          quantity: product.quantity,
        };
      }),
      mode: 'payment',
      success_url: 'http://localhost:3000?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cart',
    });
  
    response.json({url: session.url})
  }
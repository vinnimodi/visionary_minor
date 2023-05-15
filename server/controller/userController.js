import Customer from '../models/user-schema.js';
import dotenv from 'dotenv';
dotenv.config();

export const userSignUp = async (request, response) => {
  try {
    const { firstName, lastName, username, email, password, MobileNumber } =
      request.body;
    // Check if the username already exists

    const existingUsername = await Customer.findOne({ username });
    if (existingUsername) {
      return response.status(401).json({ message: 'Username already exists' });
    }

    // Check if the mobile number already exists
    const existingMobileNumber = await Customer.findOne({ MobileNumber });
    if (existingMobileNumber) {
      return response
        .status(401)
        .json({ message: 'Mobile number already exists' });
    }

    // Check if the email already exists
    const existingEmail = await Customer.findOne({ email });
    if (existingEmail) {
      return response.status(401).json({ message: 'Email already exists' });
    }

    // Create a new customer object
    const newCustomer = new Customer({
      firstName,
      lastName,
      username,
      email,
      password,
      MobileNumber,
    });

    // Save the customer to the database
    await newCustomer.save();
    // Return success response
    response.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    // Check for validation errors
    if (error.errors) {
      const errorMessage = Object.values(error.errors).map(
        (err) => err.message
      );
      return response.status(400).json({ message: errorMessage });
    }

    // Handle other errors
    // Handle other errors
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let custo = await Customer.findOne({
      username: username,
      password: password,
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
    if (customer.Cart?.find((item) => item.product?.Title === product?.Title)) {
      customer.Cart.find(
        (item) => item.product?.Title === product?.Title
      ).quantity += 1;
    } else customer.Cart.push({ ...product, quantity: 1 });
    // console.log(customer.Cart);
    await customer.save();

    response.status(200).json({ message: customer });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
export const changeCart = async (request, response) => {
  try {
    const customer = await Customer.findById(request.body.account._id);
    const product = request.body.product;
    const index = customer.Cart.findIndex(
      (item) => item?.Title === product?.Title
    );
    console.log(product.quantity);
    if (index !== -1) {
      customer.Cart = customer.Cart.filter((item) => item !== product);
      product.quantity += request.body.change;
      if (product.quantity === 0) customer.Cart.splice(index, 1);
      else customer.Cart.splice(index, 1, product);
    }
    await customer.save();

    response.status(200).json({ message: customer });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: error });
  }
};

export const checkCart = async (request, response) => {
  try {
    const customer = await Customer.findById(request.body.account._id);
    const product = request.body.product;
    const dbProduct = customer.Cart.find(
      (item) => item?.Title === product?.Title
    );
    if (dbProduct) {
      response.status(200).json({ qty: dbProduct.quantity });
    } else {
      response.status(200).json({ qty: 0 });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
// const stripe = require('stripe')(process.env.STRIPE_KEY)
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);
export const checkOut = async (request, response) => {
  const customer = await Customer.findById(request.body.account._id);
  const products = request.body.products;
  customer.Cart = [];
  customer.save();
  const session = await stripe.checkout.sessions.create({
    customer: customer._id,
    customer_creation: 'always',
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.Title,
          },
          unit_amount: product.Price * 100,
        },
        quantity: product.quantity,
      };
    }),
    mode: 'payment',
    success_url: 'http://localhost:3000?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/cart',
  });

  response.json({ url: session.url });
};

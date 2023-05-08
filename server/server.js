import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import mongoose from 'mongoose';
import Router from './routes/users.js';
// import bodyParser from 'body-parser';
//const express = require('express');
//const cors = require('cors');
//const mongoose = require('mongoose');

import { productRouter } from './routes/products.js';
import { Connection } from './database/database.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000", "https://checkout.stripe.com"],
  })
);
//app.use(bodyParser.json({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.use('/products', productRouter);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

/*
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  //app.use('/products', require('./routes/products'));
  //app.use('/users', require('./routes/users'));
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
*/

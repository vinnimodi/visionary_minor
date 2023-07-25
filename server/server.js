import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Router from './routes/users.js';
import { productRouter } from './routes/products.js';

import { Connection } from './database/database.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["https://visionary-api.onrender.com", "https://checkout.stripe.com"],
  })
);
app.use('/', Router);
app.use('/products', productRouter);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
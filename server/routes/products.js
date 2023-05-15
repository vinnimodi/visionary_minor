import express from 'express';
import { Product } from '../models/product.model.js';
const productRouter = express.Router();

productRouter.route('/').get(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export { productRouter };

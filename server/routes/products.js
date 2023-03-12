import express from 'express';
import { Product } from '../models/product.model.js';
const productRouter = express.Router();

productRouter.route('/').get(async (req, res) => {
  const products = await Product.find();
  //   const products = data.json();
  res.json(products);
  // catch(err => res.status(400).json('Error: ' + err));
});

// router.route("/add").post(async (req, res) => {
//   const id = req.body.id;
//   const title = req.body.title;
//   const price = req.body.price;
//   const stock = req.body.stock;
//   const category = req.body.category;

//   const newProduct = new Product({ id, title, price, stock, category });

//   await newProduct.save();
//   res.json("Product added!");
//   // .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route("/:id").get(async (req, res) => {
//     const data = await Product.findById(req.params.id);
//     const product = data.json();
//     res.json(product);
//     // catch(err => res.status(400).json('Error: ' + err));
// });

export { productRouter };

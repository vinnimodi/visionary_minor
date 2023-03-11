const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/").get(async (req, res) => {
  const products = await Product.find();
  //   const products = data.json();
  res.json(products);
  // catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get(async (req, res) => {
  const data = await Product.findById(req.params.id);
  // const product = JSON.parse(data);
  res.json(data);
  // catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

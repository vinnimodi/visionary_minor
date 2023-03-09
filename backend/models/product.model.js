const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  Title: String,
  Price: Number,
  Stock: Number,
  Category: String
});
const Product = mongoose.model("item", productSchema);
module.exports = Product;

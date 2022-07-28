const Mongoose = require("mongoose");

const productSchema = new Mongoose.Schema({
  id: { type: String },
  name: { type: String },
  img: { type: String },
  price: { type: Number },
});
module.exports = Mongoose.model("Product", productSchema);

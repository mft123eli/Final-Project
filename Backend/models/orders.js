const Mongoose = require("mongoose");

const orderSchema = new Mongoose.Schema({
  user_id: { type: String },
  total_amount: { type: Number },
  product: [
    {
      productId: { type: String },
      productName: { type: String },
      price: { type: String },
      quantity: { type: Number },
    },
  ],
  totalQuantity: { type: Number },
});

module.exports = Mongoose.model("Order", orderSchema);

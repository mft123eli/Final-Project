const Order = require("../models/orders");

module.exports.orderAdd = async (req, res) => {
  const orderInfo = await Order.create({ ...req.body });
  res.json({ sucess: true, data: orderInfo });
};

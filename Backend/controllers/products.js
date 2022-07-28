const Product = require("../models/products");

exports.createProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.json({ success: true, data: newProduct });
};

exports.pictureFile = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next("error");
  }
  res.json({ success: true, data: file });
};

exports.getAllProduct = async (req, res) => {
  const search = req.query.search;

  if (search) {
    let product = await Product.find({
      name: { $regex: new RegExp("^" + search + ".*", "i") },
    }).exec();

    res.send({ success: true, data: product });
  } else {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  }
};
exports.deleteProduct = async (req, res) => {
  const product = await Product.deleteOne({ _id: req.params._id });
  res.json({ success: true, data: product });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.updateOne(
    {
      _id: req.params._id,
    },
    req.body
  );
  res.json({ success: true, data: product });
};

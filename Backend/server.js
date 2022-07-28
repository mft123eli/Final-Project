const express = require("express");
const cors = require("cors");
const app = express();
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const pathParams = require("dotenv");

const stripeSKP = process.env.STRIPE_EEBFM_MMM;
const stripePKP = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(process.env.STRIPE_EEBFM_MMM);

mongoose.connect(
  "mongodb+srv://mulu:titi123@cluster0.qnn62cy.mongodb.net/warehouse?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(`couldn't connect to db`);
    } else {
      console.log(`connected to db`);
    }
  }
);
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
console.log("nnnnnnn");
app.post("/checkout", async (req, res) => {
  const token = req.body.token;
});

app.use((err, req, res, next) => {
  if (err) {
    res.send(err.message);
  }
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

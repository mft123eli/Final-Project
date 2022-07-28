const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const buyer = "ELIFEKER";
const admin = "GODGREAT";

module.exports.SignUp = async (req, res) => {
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 9);
  const user = await User.create({ ...req.body, password: hashPassword });

  res.json({ success: true, data: user });
};
module.exports.Login = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  const validUser = await bcrypt.compare(password, user.password);
  if (validUser) {
    let token = "";
    if (user.role === "admin") {
      token = jwt.sign({ id: user._id, role: user.role }, admin);
    } else {
      token = jwt.sign({ id: user._id, role: user.role }, buyer);
    }
    res.json({ success: true, data: token });
  } else {
    res.json({ success: false });
  }
};

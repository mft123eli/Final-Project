const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});
module.exports = Mongoose.model("User", UserSchema);

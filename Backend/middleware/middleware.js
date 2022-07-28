const jwt = require("jsonwebtoken");

const buyer = "ELIFEKER";
const admin = "GODGREAT";

module.exports.authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, buyer, (err, user) => {
      req.user = user;
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("unathorized user");
  }
};

module.exports.authorizeAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, admin, (err, user) => {
      req.user = user;
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("unathorized admin");
  }
};

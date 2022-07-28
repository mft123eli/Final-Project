const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/login", userController.Login);
router.post("/signup", userController.SignUp);

module.exports = router;

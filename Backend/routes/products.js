const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const authorize = require("../middleware/middleware.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `productImg_${file.originalname}`);
  },
});

const uploadImg = multer({ storage: storage });
router.post("/file", uploadImg.single("file"), productController.pictureFile);
router.post("", authorize.authorizeAdmin, productController.createProduct);
router.get("", productController.getAllProduct);
router.delete(
  "/:_id",
  authorize.authorizeAdmin,
  productController.deleteProduct
);
router.put("/:_id", authorize.authorizeAdmin, productController.updateProduct);

module.exports = router;

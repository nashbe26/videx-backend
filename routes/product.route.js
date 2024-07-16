const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const {
  authorize,
  SUPER_ADMIN,
  LOGGED_USER,
} = require("../middleware/jwt.auth");
const { validateProduct } = require("../middleware/product.middleware");
const {
  uploadMultiImages,
  multiUploadImages,
  uploadImages,
} = require("../utils/multer");

router.get("/get-all", productController.getAllProducts);
router.get("/search-product", productController.getAllProductsCat);
router.get("/min-max", productController.getMinMaxPrice);
router.get("/get-one/:id", productController.getProductById);
router.get("/get-one-by-name", productController.getProductByName);

router.post("/create-product", productController.createProduct);
router.post(
  "/create-images-product",
  uploadImages,
  productController.gegtImagesNames
);
router.put("/update-product/:id", productController.updateProductById);
router.delete("/delete-product/:id", productController.deleteProductById);
router.get("/get-product-sub", productController.getAllProductsSub);
router.get("/search-cate-product", productController.searchCateProducts);
router.delete("/delete-images", productController.deleteImages);
router.get("/search-similar-prod", productController.searchSimilarProduct);

module.exports = router;

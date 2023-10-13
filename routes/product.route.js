const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const { authorize, SUPER_ADMIN, LOGGED_USER } = require('../middleware/jwt.auth');
const { validateProduct } = require('../middleware/product.middleware');
const { uploadMultiImages, multiUploadImages, uploadImages } = require('../utils/multer');

router.post('/create-product',  productController.createProduct);
router.post('/create-images-product',uploadImages,  productController.gegtImagesNames);
router.get('/get-all-product', productController.getAllProducts);
router.get('/get-product/:id', productController.getProductById);
router.put('/update-product/:id', productController.updateProductById);
router.delete('/delete-product/:id', productController.deleteProductById);
router.get('/search-product', productController.searchProducts);
router.get('/search-cate-product', productController.searchCateProducts);
router.delete('/delete-images', productController.deleteImages);
router.get('/search-similar-prod', productController.searchSimilarProduct);

module.exports = router;
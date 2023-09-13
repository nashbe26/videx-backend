const express = require('express');
const router = express.Router();

const imageController = require('../controller/image.controller');
const { authorize, SUPER_ADMIN } = require('../middleware/jwt.auth');
const {  uploadImages } = require('../utils/multer');

router.post('/create_one', authorize(SUPER_ADMIN),uploadImages,imageController.updateImages);
router.post('/create_two', authorize(SUPER_ADMIN),uploadImages,imageController.updateImagesTwo);
router.get('/get',imageController.getImages);

module.exports = router;
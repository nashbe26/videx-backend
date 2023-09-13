const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const { SUPER_ADMIN, LOGGED_USER, authorize } = require('../middleware/jwt.auth');

router.get('/get-all', categoryController.getAllCategories);
router.post('/create-category',authorize(SUPER_ADMIN), categoryController.createCategory);
router.get('/get-one/:categoryId', categoryController.getCategoryById);
router.put('/update-one/:categoryId', authorize(SUPER_ADMIN),categoryController.updateCategory);
router.delete('/delete-one/:categoryId',authorize(SUPER_ADMIN),categoryController.deleteCategory);
router.put('/update-sub/:categoryId',authorize(SUPER_ADMIN), categoryController.updateSubCategory);

module.exports = router;
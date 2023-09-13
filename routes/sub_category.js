const express = require('express');
const router = express.Router();
const subcategoryController = require('../controller/sub_category.controller');
const { SUPER_ADMIN, LOGGED_USER, authorize } = require('../middleware/jwt.auth');

router.get('/get-one', subcategoryController.getAllSubcategories);
router.post('/create-one',authorize([SUPER_ADMIN]), subcategoryController.createSubcategory);
router.get('/get-all/:subcategoryId', subcategoryController.getSubcategoryById);
router.put('/update-one/:subcategoryId',authorize([SUPER_ADMIN]), subcategoryController.updateSubcategory);
router.delete('/delete-one/:subcategoryId',authorize([SUPER_ADMIN]), subcategoryController.deleteSubcategory);

module.exports = router;
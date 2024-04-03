const express = require('express');
const { register, login, loginAdmin } = require('../controller/auth.controller');

const { validateUser, validateLogin } = require('../middleware/auth.middleware');

const router = express.Router();


router.post('/register',register);
router.post('/forgot-password',register);
router.post('/login',validateLogin,login);
router.post('/loginAdmin',validateLogin,loginAdmin);


module.exports = router;
var express = require('express');
var router = express.Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const contactRoutes = require('./contact.route');
const commandeRoutes = require('./commande.route');
const carRoutes = require('./car.route');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const imageRoutes = require('./image.route');
const subcategoryRoutes = require('./sub_category');
const vidangeRoutes = require('./vidange.route');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/contact', contactRoutes);
router.use('/commande', commandeRoutes);
router.use('/car', carRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/sub-category', subcategoryRoutes);
router.use('/images', imageRoutes);
router.use('/vidange', vidangeRoutes);


module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/detail/:id', productController.getProductDetail);
router.get('/:category', productController.getProductsByCategory);
router.get('/', productController.getAllProducts);

module.exports = router; 
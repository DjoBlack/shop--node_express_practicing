const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin.js');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/product-list', adminController.getProductList);

router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product');

router.get('/edit-product');

// exports.routes = router;
// exports.products = products;

module.exports = router;
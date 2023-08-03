const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin.js');

const router = express.Router();

router.get('/add-product', adminController.getProductAdd);

router.get('/product-list', adminController.getProductList);

router.post('/add-product', adminController.postProductAdd);

router.get('/edit-product/:productId', adminController.getProductEdit);

router.post('/edit-product', adminController.postProductEdit);

// router.post('/delete-product', adminController.postProductDelete);

// exports.routes = router;
// exports.products = products;

module.exports = router;
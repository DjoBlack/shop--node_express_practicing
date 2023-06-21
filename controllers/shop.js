const Product = require('../models/product.js');

exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        });
        // console.log(products);
    });
}

exports.getProductList = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'Products List', 
            path: '/product-list', 
            hasProducts: products.length > 0, 
            activeShop: true
        });
        // console.log(products);
    });
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: 'Product Detail', 
            path: ''
        });
    });
}

exports.getCart = (req, res) => {
    res.render('shop/cart', {
        pageTitle: 'Cart', 
        path: '/cart'
    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/');
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    });
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Orders', 
        path: '/corders'
    });
}
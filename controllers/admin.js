const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product Page', 
        path: '/admin/add-product', 
        activeAddProduct: true, 
        formCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(title, description, price);
    product.save();
    res.redirect('/');
};

exports.getProductList = (req, res) => {
    Product.fetchAll((products) => {
        res.render('admin/product-list', {
            prods: products, 
            pageTitle: 'Admin Products List', 
            path: '/admin/product-list'
        });
        // console.log(products);
    });
}

exports.getProductEdit = (req, res) => {

}

exports.postProductDelete = (req, res) => {

}
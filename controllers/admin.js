const Product = require('../models/product.js');

exports.getProductAdd = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product Page', 
        path: '/admin/add-product'    
    });
};

exports.postProductAdd = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(title, price, description);
    product.save();
    res.redirect('/admin/add-product');
};

exports.getProductEdit = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product Page', 
            path: '/admin/edit-product', 
            product: product
        });
    }); 
};

exports.postProductEdit = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const updatedProduct = new Product(prodId, updatedTitle, updatedDescription, updatedPrice);
    updatedProduct.update();
    res.redirect('/admin/product-list');
}

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

exports.postProductDelete = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/product-list');
}
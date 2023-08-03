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
    res.redirect('/admin/product-list');
};

exports.getProductEdit = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product
        .findById(prodId)
        .then(product => {
            res.render('admin/edit-product', {
                product: product, 
                pageTitle: 'Product Edit Page', 
                path: 'admin/edit-product'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postProductEdit = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const product = new Product(updatedTitle, updatedPrice, updatedDescription, prodId);
    product.save()
        .then(result => {
            console.log('Product Updated!');
            res.redirect('/admin/product-list');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getProductList = (req, res) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('admin/product-list', {
                prods: products, 
                pageTitle: 'Admin Products List', 
                path: '/admin/product-list', 
                hasProducts: products.length > 0, 
                activeShop: true
            });
        // console.log(products);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postProductDelete = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/product-list');
}
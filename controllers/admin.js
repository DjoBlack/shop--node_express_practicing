const Product = require('../models/product.js');

exports.getProductAdd = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product Page', 
        path: '/admin/add-product'    
    });
};

exports.postProductAdd = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    
    const product = new Product({title: title, price: price, description: description, userId: req.user._id});
    product.save().then(result => {
        console.log(result);
        res.redirect('/admin/product-list');
    }).catch(err => {
        console.log(err);
    });
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

    Product
        .findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save();
        })
        .then(result => {
            console.log('Product Updated!');
            res.redirect('/admin/product-list');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProductList = (req, res) => {
    Product
        .find()
        // .populate('userId')
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
    Product.findByIdAndRemove(prodId)
    .then(result => {
        res.redirect('/admin/product-list');
    })
    .catch(err => {
        console.log(err);
    })
}
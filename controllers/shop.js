const Product = require('../models/product.js');

exports.getIndex = (req, res) => {
    Product
        .find()
        .then(products => {
            res.render('shop/index', {
                prods: products, 
                pageTitle: 'Shop', 
                path: '/'
            });
            // console.log(products);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProductList = (req, res, next) => {
    Product
        .find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products, 
                pageTitle: 'Products List', 
                path: '/product-list', 
                hasProducts: products.length > 0, 
                activeShop: true
            });
        // console.log(products);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
        .findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product, 
                pageTitle: 'Product Details', 
                path: ''
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);  
    })
    .then(result => {
        console.log(result);
        res.redirect('/product-list');
    })
    .catch(err => {
        console.log(err);
    })

    
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then(user => {
        console.log(user.cart.items)
        const products = user.cart.items;
        res.render('shop/cart', {
            products: products, 
            pageTitle: 'Cart', 
            path: '/cart'
        });
    }).catch(err => {
        console.log(err);
    })
};

exports.postCartRemoveItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
    })
};

exports.postOrderCreate = (req, res, next) => {
    req.user
        .createOrder()
        .then(result => {
            console.log(result);
            res.redirect('/orders');
        })
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders', 
                path: '/orders', 
                orders: orders
            });
            let result = (orders.forEach(order => {
                console.log(order);
            }));
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        })
};

// exports.getCart = (req, res) => {
//     Cart.getCart(cart => {
//         Product.fetchAll(products => {
//             const cartProduct = [];
//             for (product of products) {
//                 const cartProdData = cart.products.find(prod => prod.id === product.id);
//                 if(cartProdData) {
//                     cartProduct.push({prodData: product, qty: cartProdData.qty});
//                 }
//             }

//             res.render('shop/cart', {
//                 pageTitle: 'Cart', 
//                 path: '/cart',
//                 products: cartProduct,
//                 totalPrice: cart.totalPrice
//             });
//         });
        
//     });
    
// }

// exports.postCart = (req, res) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, (product) => {
//         Cart.addProduct(prodId, product.price);
//     });
//     res.redirect('/product-list');
// }

// exports.postCartRemoveItem = (req, res) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, product => {
//         console.log(product);
//         Cart.deleteProduct(prodId, product.price);
//         res.redirect('/cart');
//     })
    
// }

// exports.getCheckout = (req, res) => {
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout', 
//         path: '/checkout'
//     });
// }


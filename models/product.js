const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    }, 
    description: {
        type: String, 
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDB = require('../utils/database').getDB;

// class Product {
//     constructor(title, price, description, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = new mongodb.ObjectId(userId);
//     }

//     save() {
//         const db = getDB();
//         let dbOp;

//         if(this._id) {
//             dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
//         } else {
//             dbOp = db.collection('products').insertOne(this);               
//         }
//         return dbOp
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db
//         .collection('products')
//         .find()
//         .toArray()
//         .then(products => {
//             // console.log(products);
//             return products;
//         })
//         .catch(err => {
//             console.log(err)
//         });
//     }

//     static findById(prodId) {
//         const db = getDB();
//         return db
//         .collection('products')
//         .findOne({ _id: new mongodb.ObjectId(prodId) })
//         .then(product => {
//             // console.log(product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err)
//         });
//     }
    

//     static deleteById(prodId) {
//         const db = getDB();
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             Product.removeFromCartDuringDelete(prodId);
//             console.log('Product deleted!');
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }

//     static removeFromCartDuringDelete(prodId) {
//         const db = getDB();
//         return db
//             .collection('users')
//             .find({"cart.items.productId": new mongodb.ObjectId(prodId)})
//             .toArray()
//             .then(arrayOfCarts => {
//                 arrayOfCarts.forEach(i => {
//                     // console.log(i);
//                     const updatedCartItems = i.cart.items.filter(item => {
//                         return item.productId.toString() !== prodId.toString();
//                     });

//                     const db = getDB();
//                     return db
//                         .collection('users')
//                         .updateOne(
//                             { _id: new mongodb.ObjectId(i._id) }, 
//                             { $set: { cart: {items: updatedCartItems}}}
//                         )
//                         .then(result => {
//                             console.log("item removed from user cart.");
//                         })
//                         .catch(err => {
//                             console.log(err);
//                         });
//                 })
//             });

//     }
// }

// module.exports = Product;

// // const fs = require('fs');
// // const path = require('path');

// // const Cart = require('./cart');

// // const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');

// // const getProductsFromFile = cb => {
// //         fs.readFile(p, (err, fileContent) => {
// //             if(err) {
// //                 cb([]);
// //             } else {
// //                 cb(JSON.parse(fileContent));
// //             } 
// //         });
// // }

// // module.exports = class Product {
// //     constructor(id, title, description, price) {
// //         this.id = id;
// //         this.title = title;
// //         this.description = description;
// //         this.price = price;
// //     };

// //     save() {
// //         this.id = Math.random().toString()
// //         getProductsFromFile((products) => {
// //             products.push(this);
// //             fs.writeFile(p, JSON.stringify(products), (err) => {
// //                 let errMsg = err ? console.log(err) : '';
// //             });
// //         });
// //     };

// //     update() {
// //         getProductsFromFile((products) => {
// //             // console.log(products);
// //             if(this.id) {
// //                 const existingProduct = products.findIndex(prod => prod.id === this.id);
// //                 const updatedProduct = [...products];
// //                 updatedProduct[existingProduct] = this;
// //                 fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// //                     console.log(err);
// //                 });
// //             }
// //         });
// //     }

// //     static deleteById(id) {
// //         getProductsFromFile(products => {
// //             const product = products.find(prod => prod.id === id);
// //             const updatedProducts = products.filter(p => p.id !== id);
// //             fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// //                 if(!err) {
// //                     Cart.deleteProduct(id, product.price);
// //                 }
// //             });
// //         });
// //     }

// //     static fetchAll(cb) {
// //         getProductsFromFile(cb);
// //     };

// //     static findById(id, cb) {
// //         getProductsFromFile(products => {
// //             const product = products.find(p => p.id === id);
// //             cb(product);
// //         });
// //     }
// // }
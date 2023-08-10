const mongodb = require('mongodb');
const getDB = require('../utils/database').getDB;

class User {
    constructor(userName, email, cart = {items: []}, id) {
        this.name = userName;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDB();
        let user;

        return user = db
        .collection('users')
        .insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    };

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
        }

        console.log(updatedCartItems)
        
        const updatedCart = {
            items: updatedCartItems
        }

        const db = getDB();
        return db
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                { $set: { cart: updatedCart}}
            )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        })

        return db
        .collection('products')
        .find({ _id: {$in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p, 
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        })
        .catch(err => {
            console.log(err)
        });

    };

    deleteItemFromCart(productId) {
        console.log(this.cart.items);
        
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        const db = getDB();
        return db
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                { $set: { cart: {items: updatedCartItems}}}
            )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(userId) {
        const db = getDB();
        return db
        .collection('users')
        .findOne({ _id: new mongodb.ObjectId(userId) })
        .then(user => {
            // console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err)
        });
    };
}

module.exports = User;
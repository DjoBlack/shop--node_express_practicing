const mongodb = require('mongodb');
const getDB = require('../utils/database').getDB;

class User {
    constructor(userName, email, cart, id) {
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
        // const cart = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // })
        
        const updatedCart = {items: [{productId: new mongodb.ObjectId(product._id), quantity: 1}]};

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
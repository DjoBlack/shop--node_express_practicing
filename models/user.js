const mongodb = require('mongodb');
const getDB = require('../utils/database').getDB;

class User {
    constructor(userName, email) {
        this.name = userName;
        this.email = email;
    }

    save() {
        const db = getDB();
        let user;

        return user = db.collection('users').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    };

    // static findById(userId) {
    //     const db = getDB();
    //     return db
    //     .collection('users')
    //     .findOne({ _id: new mongodb.ObjectId(userId) })
    //     .then(user => {
    //         // console.log(product);
    //         return user;
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    // };
}

module.exports = User;
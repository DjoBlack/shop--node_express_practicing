const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const DBCredetials = require('./DB');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(DBCredetials)
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDB = () => {
    if(_db) {
        return _db;
    }

    throw 'No DB found!';
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
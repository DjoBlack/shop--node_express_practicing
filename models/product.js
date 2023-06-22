const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');

const getProductsFromFile = cb => {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            } 
        });
}

module.exports = class Product {
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    };

    save() {
        this.id = Math.random().toString()
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                let errMsg = err ? console.log(err) : '';
            });
        });
    };

    static fetchAll(cb) {
        getProductsFromFile(cb);
    };

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}
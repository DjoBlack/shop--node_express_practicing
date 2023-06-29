const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');

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
    constructor(id, title, description, price) {
        this.id = id;
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

    update() {
        getProductsFromFile((products) => {
            // console.log(products);
            if(this.id) {
                const existingProduct = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProduct] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    cb(product);
                }
            });
        });
    }

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
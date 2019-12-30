const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    priceOfProduct: Number,
    nameOfimgOfProduct: String
}, {
    versionKey: false
});

const Product = mongoose.model('Product', productSchema, 'products');

function getAllProducts() {
    return new Promise((resolve, reject) => {
        Product.find({}).populate('category').exec((err, products) => {
            if (err) {
                reject(ere);
                return
            }
            resolve(products);
        });
    });
};

function countAllAvailableProducts() {
    return new Promise((resolve, reject) => {
        Product.countDocuments({}).populate('category').exec((err, products) => {
            if (err) {
                reject(ere);
                return
            }
            resolve(products);
        });
    });
};

function addProduct(product) {
    return new Promise((resolve, reject) => {
        const productToAdd = new Product(product);
        productToAdd.save((err, product) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(product);
        });
    });
};

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        const prod = new Product(product);
        Product.updateOne({
            _id: product._id
        }, prod, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(prod);
        });
    });
};

function getProductsByCategory(category) {
    return new Promise((resolve, reject) => {
        Product.find({
            category
        }).populate('category').exec((err, products) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
};

function capitalizeSearchWord(name) {
    var splitStr = name.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function getProductsByName(name) {
    name = capitalizeSearchWord(name);
    return new Promise((resolve, reject) => {
        Product.find({
            name
        }).populate('category').exec((err, products) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
};

module.exports = {
    productSchema,
    Product,
    getAllProducts,
    addProduct,
    updateProduct,
    getProductsByName,
    countAllAvailableProducts,
    getProductsByCategory
}
const mongoose = require('mongoose');

const itemFromCartSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: Number,
    totalPrice: Number,
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
}, {
    versionKey: false
});

const Item = mongoose.model('Item', itemFromCartSchema, 'items');

function getAllItems() {
    return new Promise((resolve, reject) => {
        Item.find({}).populate('productID').exec((err, items) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(items);
        });
    });
};

function getAllItemsByCartID(cartID) {
    return new Promise((resolve, reject) => {
        Item.find({
            cartID
        }).populate('productID').exec((err, items) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(items);
        });
    });
};

function addItem(item) {
    return new Promise((resolve, reject) => {
        const itemToadd = new Item(item);
        itemToadd.save((err, item) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(item);
        });
    });
};

function deleteOneCartItem(_id) {
    return new Promise((resolve, reject) => {
        Item.deleteOne({
            _id
        }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

function deleteAllCartItems(cartID) {
    return new Promise((resolve, reject) => {
        Item.deleteMany({
            cartID
        }).exec((err, info) => {
            if (err) {
                reject(err);
                return;
            };
            resolve("All items have been deleted.");
        });
    });
};


module.exports = {
    getAllItems,
    addItem,
    deleteOneCartItem,
    deleteAllCartItems,
    getAllItemsByCartID
}
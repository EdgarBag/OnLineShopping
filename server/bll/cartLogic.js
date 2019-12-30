const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currentDate: String,
    status: String
}, {
    versionKey: false
});
const Cart = mongoose.model('Cart', cartSchema, 'carts');

function getAllCarts() {
    return new Promise((resolve, reject) => {
        Cart.find({}, (err, carts) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(carts);
        });
    });
};

function addCart(cart) {
    return new Promise((resolve, reject) => {
        const cartToAdd = new Cart(cart);
        cartToAdd.save((err, cart) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(cart);
        });
    });
};


function updateCart(cart) {
    return new Promise((resolve, reject) => {
        const updatedCart = new Cart(cart);
        Cart.updateOne({
            _id: cart._id
        }, updatedCart, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(updatedCart);
        });
    });
}

function getCartByStatus(status) {
    return new Promise((resolve, reject) => {
        Cart.find({
            status
        }, (err, carts) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(carts);
        });
    });
}

function findCart(userID, status) {
    return new Promise((resolve, reject) => {
        Cart.find({
            userID,
            status
        }, (err, cart) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(cart[0]);
        });
    });
};


module.exports = {
    cartSchema,
    Cart,
    getAllCarts,
    addCart,
    updateCart,
    getCartByStatus,
    findCart
};
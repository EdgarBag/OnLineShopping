const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    totalPriceOFOrder: Number,
    shippingCity: String,
    shippingStreet: String,
    dateOfShipping: String,
    creditCard: Number
}, {
    versionKey: false
});

const Order = mongoose.model('Order', ordersSchema, 'orders');

function getAllOrders() {
    return new Promise((resolve, reject) => {
        Order.find({}, (err, orders) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(orders);
        });
    });
};

function countAllOrders() {
    return new Promise((resolve, reject) => {
        Order.countDocuments({}, (err, products) => {
            if (err) {
                reject(ere);
                return
            }
            resolve(products);
        });
    });
};

function addOrder(order) {
    return new Promise((resolve, reject) => {
        const orderToAdd = new Order(order);
        orderToAdd.save((err, order) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(order);
        })
    })
}

function updateCart(order) {
    return new Promise((resolve, reject) => {
        const ord = new Order(order);
        Order.updateOne({
            _id: order._id
        }, ord, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(ord)
        });
    });
};

module.exports = {
    ordersSchema,
    Order,
    getAllOrders,
    addOrder,
    countAllOrders,
    updateCart
};
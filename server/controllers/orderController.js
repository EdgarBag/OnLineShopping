const express = require('express');
const router = express.Router();
const orderLogic = require('../bll/orderLogic');
const OrderModel = require('../models/order');


router.get('/', async (request, response) => {
    try {
        const orders = await orderLogic.getAllOrders();
        response.json(orders);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//count of all orders
router.get('/count', async (request, response) => {
    try {
        const countOrders = await orderLogic.countAllOrders();
        response.json(countOrders);
    } catch (err) {
        response.status(500).send(err.message)
    }
});

router.post('/', async (request, response) => {
    try {
        const order = request.body;
        const errorDetails = OrderModel.validate(order);
        if (errorDetails) {
            response.status(400).json(errorDetails);
            return;
        }
        const addedOrder = await orderLogic.addOrder(order);
        response.json(addedOrder);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.patch('/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        const order = request.body;
        order._id = _id;
        const updatedOrder = await orderLogic.updateCart(order);
        response.json(updatedOrder);
    } catch (err) {
        response.status(500).send(err.message)
    }
})

module.exports = router;
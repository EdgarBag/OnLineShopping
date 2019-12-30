const express = require('express');
const router = express.Router();
const cartlogic = require('../bll/cartLogic');

router.get('/', async (request, response) => {
    try {
        const products = await cartlogic.getAllCarts();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message)
    }
});

//adding new cart
router.post('/cart-for-user', async (request, response) => {
    try {
        const cartToFind = request.body;
        const cart = await cartlogic.findCart(cartToFind.userID, cartToFind.status);
        if (!cart) {
            response.status(401).send("There is no open cart!");
            return;
        };
        response.json(cart);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

//getting cart by status
router.get('/get-cart-by-status/:status', async (request, response) => {
    try {
        const status = request.params.status;
        const carts = await cartlogic.getCartByStatus(status);
        response.json(carts);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


router.post('/', async (request, response) => {
    try {
        const cart = request.body;
        const addedCart = await cartlogic.addCart(cart);
        response.json(addedCart);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//update cart status
router.patch("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const cart = request.body;
        cart._id = _id;
        const updatedCart = await cartlogic.updateCart(cart);
        response.json(updatedCart);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
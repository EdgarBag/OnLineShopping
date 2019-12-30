const express = require("express");
const router = express.Router();
const itemLogic = require('../bll/itemLogic');


router.get('/', async (request, response) => {
    try {
        const items = await itemLogic.getAllItems();
        response.json(items);
    } catch (err) {
        response.status(500).send(err.message)
    }
});

router.get('/get-items-by-cartID/:cartID', async (request, response) => {
    try {
        const cartID = request.params.cartID;
        const items = await itemLogic.getAllItemsByCartID(cartID);
        response.json(items);
    } catch (err) {
        response.status(500).send(err.message)
    }
});

router.post('/', async (request, response) => {
    try {
        const item = request.body;
        const addedItem = await itemLogic.addItem(item);
        response.json(addedItem);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete('/:_id', async (request, response) => {
    try {
        const _id = request.params;
        await itemLogic.deleteOneCartItem(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete('/delete-all-items/:cartID', async (request, response) => {
    try {
        const items = request.params.cartID;
        await itemLogic.deleteAllCartItems(items);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;
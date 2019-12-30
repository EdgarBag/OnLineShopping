const express = require('express');
const router = express.Router();
const categorylogic = require('../bll/categoryLogic');
const verifyLoggedIn = require('../middlewares/verify-logged')

router.get('/', verifyLoggedIn, async (request, response) => {
    try {
        const categories = await categorylogic.getAllCategories();
        response.json(categories);
    } catch (err) {
        response.status(500).send(err.message)
    }
});


module.exports = router;
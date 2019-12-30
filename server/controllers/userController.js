const express = require('express');
const router = express.Router();
const userLogic = require('../bll/userLogic');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

//find user for log in
router.post('/login', async (request, response) => {
    try {
        const userToFind = request.body;
        const user = await userLogic.findUserforLogIn(userToFind.userFirstName, userToFind.password);
        if (!user) {
            response.status(401).send("Incorrect username or password!");
            return;
        }
        const token = jwt.sign({
            user
        }, 'super', {
            expiresIn: '20m'
        });
        response.json({
            user,
            token
        });
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//add user
router.post('/sign-up', async (request, response) => {
    try {
        const user = request.body;
        const errorsDetails = UserModel.validate(user);
        if (errorsDetails) {
            response.status(400).json(errorsDetails);
            return;
        };
        const userToAdd = await userLogic.addUser(user);
        const token = jwt.sign({
            userToAdd
        }, 'super', {
            expiresIn: '20m'
        });

        response.status(201).json({
            userToAdd,
            token
        });

    } catch (err) {
        response.status(500).send(err);
    };
});

module.exports = router;
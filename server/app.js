const express = require('express');
const productController = require('./controllers/productController');
const categoriesController = require('./controllers/categoryController');
const userController = require('./controllers/userController');
const cartController = require('./controllers/cartController');
const itemController = require('./controllers/itemController');
const orderController = require('./controllers/orderController');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/superDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, mongoClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("We're connected to " + mongoClient.name + " DB");
    });


server.use(cors());
server.use(express.json());
server.use('/api/products', productController);
server.use('/api/categories', categoriesController);
server.use('/api/auth/users', userController);
server.use(express.static(__dirname));
server.use('/api/carts', cartController);
server.use('/api/items', itemController);
server.use('/api/orders', orderController);
server.get("/home", (request, response) => response.sendFile(__dirname + "\\home.component.html"));
server.get("/login", (request, response) => {
    response.sendFile(__dirname + "\\angular-project\\login.component.html");
});

server.listen(3000, () => console.log("listenning to localhost:3000...."));
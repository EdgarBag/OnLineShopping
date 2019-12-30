const express = require('express');
const router = express.Router();
const productLogic = require('../bll/productLogic')
const ProductModel = require('../models/product');
const verifyLoggedInd = require('../middlewares/verify-logged');
const userLogic = require('../bll/userLogic');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: ((reqeust, file, response) => {
        response(null, './assets/images');
    }),
    filename: ((request, file, response) => {
        response(null, file.originalname)
    })
});

const upload = multer({
    storage: storage
});


//get all products
router.get('/', async (request, response) => {
    try {
        const products = await productLogic.getAllProducts();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message)
    }
});


router.get('/count', async (request, response) => {
    try {
        const products = await productLogic.countAllAvailableProducts();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message)
    }
});


//adding a new product, after checking type of user and validation
router.post('/', verifyLoggedInd, upload.single('nameOfimgOfProduct'), async (request, response) => {
    try {
        const requestBody = request.body;
        const productToAdd = {
            name: requestBody.productName,
            category: requestBody.productCategory,
            priceOfProduct: requestBody.productPrice,
            nameOfimgOfProduct: request.file.path
        }
        const errorsDetails = ProductModel.validate(productToAdd);
        if (errorsDetails) {
            response.status(400).json(errorsDetails);
            return;
        };
        await userLogic.checkTypeOfuser(requestBody.typeOfUser);
        const isNameExist = await productLogic.getProductsByName(requestBody.productName);

        if (isNameExist.length > 0) {
            response.status(400).json("This product name exist already.\nPlease choose another name!");
            return;
        }
        const addedProduct = await productLogic.addProduct(productToAdd);
        response.json(addedProduct);
    } catch (err) {
        response.status(500).send(err);
    }
});

//update product, after checking type of user and validation
router.patch('/:_id', upload.single('nameOfimgOfProduct'), async (request, response) => {
    try {
        const _id = request.params._id;
        const requestBody = request.body;
        let product = {
            _id: requestBody._id,
            name: requestBody.name,
            category: requestBody.category,
            priceOfProduct: requestBody.priceOfProduct,
            nameOfimgOfProduct: request.file.path
        };
        delete product._id;
        const errorsDetails = ProductModel.validate(product);
        if (errorsDetails) {
            response.status(400).json(errorsDetails);
            return;
        };
        await userLogic.checkTypeOfuser(requestBody.typeOfUser);
        product._id = _id;
        const updatedproduct = await productLogic.updateProduct(product);
        response.json(updatedproduct);
    } catch (err) {
        response.status(500).send(err);
    }

});


//products for search
router.get('/products-by-name/:name', async (request, response) => {
    try {
        const name = request.params.name;
        const products = await productLogic.getProductsByName(name);
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.get('/products-by-category/:_id', verifyLoggedInd, async (request, response) => {
    try {
        const _id = request.params._id;
        const products = await productLogic.getProductsByCategory(_id);
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message)
    }
});

module.exports = router;
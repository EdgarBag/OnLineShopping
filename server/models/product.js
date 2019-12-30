const Joi = require('joi');

class ProductModel {

    constructor(_id, name, category, priceOfProduct, nameOfimgOfProduct) {
        this._id = _id;
        this.name = name;
        this.category = category;
        this.priceOfProduct = priceOfProduct;
        this.nameOfimgOfProduct = nameOfimgOfProduct;
    }
    // validatValidate of new user
    static validate(productToValidate) {
        const validationSchema = {
            name: Joi.string().required().min(4).max(30),
            category: Joi.string().required(),
            priceOfProduct: Joi.number().positive().required(),
            nameOfimgOfProduct: Joi.string(),
        };
        const error = Joi.validate(
            productToValidate, validationSchema, {
                abortEarly: false
            }).error;

        if (error) {
            return error.details.map(err => err.message)
        }
        return null;
    }
}

module.exports = ProductModel;
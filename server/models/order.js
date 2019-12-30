const Joi = require('joi');

class OrderModel {
    constructor(_id, userID, cartID, totalPriceOFOrder,
        shippingCity, shippingStreet, dateOfShipping, creditCard

    ) {
        this._id = _id;
        this.userID = userID;
        this.cartID = cartID;
        this.totalPriceOFOrder = totalPriceOFOrder;
        this.shippingCity = shippingCity;
        this.shippingStreet = shippingStreet;
        this.dateOfShipping = dateOfShipping;
        this.creditCard = creditCard
    }

    static validate(orderToValidate) {
        const validationSchema = {
            userID: Joi.string().required(),
            cartID: Joi.string().required(),
            totalPriceOFOrder: Joi.number().required(),
            shippingCity: Joi.string().required(),
            shippingStreet: Joi.string().required(),
            dateOfShipping: Joi.string().required(),
            creditCard: Joi.number().required().min(10)
        }

        const error = Joi.validate(
            orderToValidate, validationSchema, {
                abortEarly: false
            }).error;

        if (error) {
            return error.details.map(err => err.message)
        }

        return null;

    }
}

module.exports = OrderModel;
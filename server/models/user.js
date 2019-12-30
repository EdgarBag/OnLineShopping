const Joi = require('joi');

class UserModel {
    constructor(_id, typeOfUser, userFirstName, userLastName, email,
        password, phoneNumber, city, street, buildingNumber) {
        this._id = _id;
        this.typeOfUser = typeOfUser;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.street = street;
        this.buildingNumber = buildingNumber;
    }
    // validatValidate the  new user
    static validate(userToValildate) {
        const validationSchema = {
            userFirstName: Joi.string().required().min(4).max(15),
            userLastName: Joi.string().required().min(4).max(15),
            // typeOfUser:Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(4).max(20),
            phoneNumber: Joi.number().required(),
            city: Joi.string().required().min(4).max(20),
            street: Joi.string().required().min(4).max(20),
            buildingNumber: Joi.number().required(),
        };

        const error = Joi.validate(
            userToValildate, validationSchema, {
                abortEarly: false
            }).error;

        if (error) {
            return error.details.map(err => err.message)
        }

        return null;
    }

}


module.exports = UserModel;
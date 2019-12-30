const mongoose = require('mongoose');
const hash = require('./hash');

const userSchema = mongoose.Schema({
    userFirstName: String,
    userLastName: String,
    typeOfUser: {
        type: String,
        default: 0
    },
    email: String,
    password: String,
    phoneNumber: Number,
    city: String,
    street: String,
    buildingNumber: Number
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema, 'users');

function findUserforLogIn(userFirstName, password) {
    password = hash(password);
    return new Promise((resolve, reject) => {
        User.find({
            userFirstName,
            password
        }, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(user[0]);
        });
    });
};

function checkTypeOfuser(typeOfUser) {
    var type = 'admin';
    type = hash(type);

    return new Promise((resolve, reject) => {
        if (type === typeOfUser) {
            resolve(true);
        } else {
            reject("You don't have permission to perform this action!");
        }
    });
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        const userToAdd = new User(user);
        User.find({
            email: userToAdd.email,
        }, (err, user) => {
            if (user.length) {
                const errMessage = "Email already exist in the system";
                reject(errMessage);
            } else {
                userToAdd.password = hash(userToAdd.password);
                userToAdd.save((err, user) => {
                    if (err) {
                        reject(err);
                        return;
                    };
                    delete userToAdd.password;
                    resolve(user);
                });
            };
        });
    });
};


module.exports = {
    userSchema,
    User,
    addUser,
    findUserforLogIn,
    checkTypeOfuser
}
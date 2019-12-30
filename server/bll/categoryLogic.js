const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    categoryName: String
}, {
    versionKey: false
});

const Category = mongoose.model('Category', categorySchema, 'categories');

function getAllCategories() {
    return new Promise((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(categories);
        });
    });
};

module.exports = {
    categorySchema,
    Category,
    getAllCategories
}
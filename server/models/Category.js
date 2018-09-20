const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String
},{
    collection: 'Category'
});

const Category = mongoose.model('Category', categorySchema);

const addCategory = (category) => {
    return Category.create(category);
}

module.exports = {
    addCategory
}

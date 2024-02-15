const Category = require('./categories.model')
const checkResource = require('../../../utils/checkResource')

const getCategories = async () => {
    const categories = await Category.find().populate({
        path: 'products',
        select: '_id name short_description price urlKey image'
    });
    return categories;
}

const getCategory = async (id) => {
    const category = await Category.findById(id).populate({
        path: 'products',
        select: '_id name short_description price urlKey image images'
    });

    checkResource(category, 'category');

    return category;
}

module.exports = {
    getCategories,
    getCategory
}
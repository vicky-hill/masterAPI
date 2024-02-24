const Category = require('./categories.model')
const throwError = require('../../../utils/throwError')

const getCategories = async () => {
    const categories = await Category.find()
        .sort({ sort: 1 })
        .populate({
            path: 'products',
            select: '_id name short_description price urlKey image sort',
            options: { sort: { sort: 1 } }
        });
    return categories;
}

const getCategory = async (id) => {
    const category = await Category.findById(id).populate({
        path: 'products',
        select: '_id name short_description price urlKey image images sort',
        options: { sort: { sort: 1 } }
    });

    !category && throwError(`Could not find category by ID: ${id}`);

    return category;
}

module.exports = {
    getCategories,
    getCategory
}
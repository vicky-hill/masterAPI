const Category = require('./categories.model')

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
        select: '_id name short_description price urlKey image'
    });

    if (!category) {
        const error = new Error("Category not found")
        error.code = 404
        throw error;
    }

    return category;
}

module.exports = {
    getCategories,
    getCategory
}
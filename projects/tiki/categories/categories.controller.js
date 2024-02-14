const Category = require('./categories.model')
const validate = require('../utils/validation')
const { getCategories, getCategory } = require ('./categories.utils')
const checkResource = require('../../../utils/checkResource')

/**
 * Get categories
 * @returns { data: categories [] }
 */
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getCategories();

        res.json({
            data: categories
        });
    } catch (err) {
        next(err)
    }
}

/**
 * Get one category
 * @param categoryID
 * @returns category {}
 */
const getCategoryByID = async (req, res, next) => {
    try {
        const { categoryID } = req.params; 
        const category = await getCategory(categoryID);

        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}

/**
 * Save category
 * @property {string} req.body.name 
 * @property {string} req.body.status
 * @returns category {}
 */
const createCategory = async (req, res, next) => {
    try {
        await validate.createCategory(req.body);

        const newCategory = await Category.create(req.body);
        const category = await getCategory(newCategory._id);

        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
}

/**
 * Update category
 * @param categoryID
 * @property {string} req.body.name 
 * @property {string} req.body.status
 * @returns category {}
 */
const updateCategory = async (req, res, next) => {
    try {
        await validate.updateCategory(req.body);
        
        const { categoryID } = req.params;
        const updateCategory = await Category.findByIdAndUpdate(categoryID, req.body, { new: true });

        checkResource(updateCategory, 'category');

        const category = await getCategory(updateCategory._id);

        res.status(200).json(category);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete category
 * @param categoryID
 * @returns category {}
 */
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryID } = req.params;
        const category = await Category.findByIdAndDelete(categoryID);

        checkResource(category, 'category');

        res.status(200).json(category)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllCategories,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory
}
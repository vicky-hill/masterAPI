const Category = require('./categories.model')
const sendError = require('../../../utils/sendError')
const validate = require('../utils/validation')

/**
 * Get categories
 * @returns { data: categories [] }
 */
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
    
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
 * @returns { data: category {} }
 */
const getCategory = async (req, res, next) => {
    try {
        const { categoryID } = req.params; 
        const category = await Category.findById(categoryID);

        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }

        if (!category) return sendError(next, 404, {
            error: `Category not found`
        });

        res.status(200).json({
            data: category
        });
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
        const category = await Category.findById(newCategory._id);

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

        if (!updateCategory) return sendError(next, 404, {
            error: `Category not found`
        });

        const category = await Category.findById(updateCategory._id);

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

        if (!category) return sendError(next, 404, {
            error: `Category not found`
        });

        res.status(200).json(category)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
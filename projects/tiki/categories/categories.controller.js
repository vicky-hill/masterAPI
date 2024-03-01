const Category = require('./categories.model')
const validate = require('../utils/validation')
const { getCategories, getCategory } = require('./categories.utils')
const throwError = require('../../../utils/throwError')

/**
 * Get categories
 * @get /categories
 * @returns { data: categories [] }
 */
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getCategories();

        res.json({ data: categories });
    } catch (err) {
        err.errorCode = 'categories_001';
        next(err);
    }
}

/**
 * Get one category
 * @get /categories/:categoryID
 * @param categoryID
 * @returns category {}
 */
const getCategoryByID = async (req, res, next) => {
    try {
        const { categoryID } = req.params;
        const category = await getCategory(categoryID);

        res.status(200).json(category);
    } catch (err) {
        err.errorCode = 'categories_002';
        next(err);
    }
}

/**
 * Save category
 * @post /categories
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
        err.errorCode = 'categories_003';
        next(err);
    }
}

/**
 * Update category
 * @put /categories/:categoryID
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

        !updateCategory && throwError(`Could not find category by ID: ${categoryID}`);

        const category = await getCategory(updateCategory._id);

        res.status(200).json(category);
    } catch (err) {
        err.errorCode = 'categories_004';
        next(err);
    }
}

/**
 * Delete category
 * @delete /categories/:categoryID
 * @param categoryID
 * @returns category {}
 */
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryID } = req.params;
        const category = await Category.findByIdAndDelete(categoryID);

        !category && throwError(`Could not find category by ID: ${categoryID}`)

        res.status(200).json(category)
    } catch (err) {
        err.errorCode = 'categories_005';
        next(err);
    }
}

/**
 * Sort categories
 * @put /categories/sort
 * @property req.body [{ _id, sort }]
 * @returns { data: [{ Category }] }
 */
const sortCategories = async (req, res, next) => {
    try {
        await validate.sortCategories(req.body);

        const data = [];

        for (const category of req.body) {
            const { _id, sort } = category;
            const updatedCategory = await Category.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedCategory);
        }

        res.json({ data });
    } catch (err) {
        err.errorCode = 'categories_006';
        next(err);
    }
}


module.exports = {
    getAllCategories,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,
    sortCategories
}
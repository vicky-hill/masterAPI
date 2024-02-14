const express = require('express');
const router = express.Router();

const categoryCtrl = require('./categories.controller');

/**
 * @route /api/tiki/categories
 * @get get all categories
 * @post save a category
 */
router
    .route('/')
    .get(categoryCtrl.getAllCategories)
    .post(categoryCtrl.createCategory)

/**
 * @route /api/tiki/categories/:categoryID
 * @get get one category
 * @put update category
 * @delete remove category
 */
router 
    .route('/:categoryID')
    .get(categoryCtrl.getCategoryByID)
    .put(categoryCtrl.updateCategory)
    .delete(categoryCtrl.deleteCategory)

module.exports = router; 
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
    .get(categoryCtrl.getCategories)
    .post(categoryCtrl.saveCategory)

/**
 * @route /api/tiki/categories/:categoryID
 * @get get one category
 * @put update category
 * @delete remove category
 */
router 
    .route('/:categoryID')
    .get(categoryCtrl.getCategory)
    .put(categoryCtrl.updateCategory)
    .delete(categoryCtrl.deleteCategory)

module.exports = router; 
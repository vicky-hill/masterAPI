import express from 'express'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, deleteAllCategories } from './categories.controller'

const router: any = express.Router()

/**
 * @get api/snapplist/categories - get all categories
 * @post api/snapplist/categories - create new category
 */
router.route('/').get(getCategories)
router.route('/').post(createCategory)
router.route('/').delete(deleteAllCategories)

/**
 * @get api/snapplist/projects/:categoryID - get category by id
 * @put api/snapplist/projects/:categoryID - update category
 * @delete api/snapplist/projects/:categoryID - delete category
 */
router.route('/:categoryID').get( getCategoryById)
router.route('/:categoryID').delete(deleteCategory)
router.route('/:categoryID').put(updateCategory)

export default router;
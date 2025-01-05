"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const router = express_1.default.Router();
/**
 * @get api/snapplist/categories - get all categories
 * @post api/snapplist/categories - create new category
 */
router.route('/').get(categories_controller_1.getCategories);
router.route('/').post(categories_controller_1.createCategory);
router.route('/').delete(categories_controller_1.deleteAllCategories);
/**
 * @get api/snapplist/projects/:categoryID - get category by id
 * @put api/snapplist/projects/:categoryID - update category
 * @delete api/snapplist/projects/:categoryID - delete category
 */
router.route('/:categoryID').get(categories_controller_1.getCategoryById);
router.route('/:categoryID').delete(categories_controller_1.deleteCategory);
router.route('/:categoryID').put(categories_controller_1.updateCategory);
exports.default = router;

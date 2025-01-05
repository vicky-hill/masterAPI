"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const categories_model_1 = __importDefault(require("../../snapplist/categories/categories.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find();
        res.json(categories);
    }
    catch (err) {
        err.ctrl = exports.getCategories;
        next(err);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const category = yield categories_model_1.default.findById(categoryId);
        if (!category)
            return (0, throwError_1.default)('Category not found');
        res.json(category);
    }
    catch (err) {
        err.ctrl = exports.getCategory;
        next(err);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const category = yield categories_model_1.default.create(req.body);
        res.json(category);
    }
    catch (err) {
        err.ctrl = exports.createCategory;
        next(err);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { categoryId } = req.params;
        const updatedCategory = yield categories_model_1.default.findByIdAndUpdate(categoryId, req.body, { new: true });
        res.json(updatedCategory);
    }
    catch (err) {
        err.ctrl = exports.updateCategory;
        next(err);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const category = yield categories_model_1.default.findByIdAndDelete(categoryId);
        res.json(category);
    }
    catch (err) {
        err.ctrl = exports.deleteCategory;
        next(err);
    }
});
exports.deleteCategory = deleteCategory;

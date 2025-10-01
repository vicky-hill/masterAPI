"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.sortCategories = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const categories_model_1 = __importDefault(require("./categories.model"));
const validate = __importStar(require("../utils/validation"));
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categories_model_1.default.find()
        .sort({ sort: 1 })
        .populate({
        path: 'products',
        select: '_id name short_description price urlKey image sort',
        options: { sort: { sort: 1 } }
    });
    return categories;
});
exports.getCategories = getCategories;
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categories_model_1.default.findById(categoryId).populate({
        path: 'products',
        select: '_id name short_description price urlKey image images sort',
        options: { sort: { sort: 1 } }
    });
    if (!category)
        throw new Error('Category not found');
    return category;
});
exports.getCategoryById = getCategoryById;
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield validate.createCategory(data);
    const newCategory = yield categories_model_1.default.create(data);
    const category = yield (0, exports.getCategoryById)(newCategory._id);
    return category;
});
exports.createCategory = createCategory;
const updateCategory = (data, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validate.updateCategory(data);
    const updateCategory = yield categories_model_1.default.findByIdAndUpdate(categoryId, data, { new: true });
    if (!updateCategory)
        throw new Error('Category not found');
    const category = yield (0, exports.getCategoryById)(updateCategory._id);
    return category;
});
exports.updateCategory = updateCategory;
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categories_model_1.default.findByIdAndDelete(categoryId);
    if (!category)
        throw new Error('Category not found');
    return category;
});
exports.deleteCategory = deleteCategory;
const sortCategories = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield validate.sortCategories(data);
    const sorted = [];
    for (const category of data) {
        const { _id, sort } = category;
        const updatedCategory = yield categories_model_1.default.findByIdAndUpdate(_id, { sort }, { new: true });
        sorted.push(updatedCategory);
    }
    return sorted;
});
exports.sortCategories = sortCategories;

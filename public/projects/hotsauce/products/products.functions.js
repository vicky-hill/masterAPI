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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const products_model_1 = __importDefault(require("./products.model"));
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find()
        .sort({ createdAt: -1 });
    return products;
});
exports.getProducts = getProducts;
const getProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findById(productId);
    if (!product)
        (0, throwError_1.default)('Product not found');
    return product;
});
exports.getProduct = getProduct;
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_model_1.default.create(data);
    const product = yield products_model_1.default.findById(newProduct._id);
    return product;
});
exports.createProduct = createProduct;
const updateProduct = (data, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProduct = yield products_model_1.default.findByIdAndUpdate(productId, data, { new: true });
    if (!updateProduct)
        return (0, throwError_1.default)('Product not found');
    const product = yield products_model_1.default.findById(updateProduct._id);
    return product;
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.default.findByIdAndDelete(productId);
    if (!product)
        (0, throwError_1.default)('Product not found');
    return product;
});
exports.deleteProduct = deleteProduct;

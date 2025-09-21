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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.sortCategories = exports.updateCategory = exports.createCategory = exports.createProduct = void 0;
const yup = require('yup');
const createProduct = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.object().shape({
        name: yup.string().required("No name was provided"),
        short_description: yup.string().required("No short description was provided"),
        description: yup.string().required("No description was provided"),
        price: yup.string().required("No price was provided"),
        quantity: yup.string().required("No quantity was provided"),
        category: yup.string().required("No category was provided"),
        images: yup.array()
            .of(yup.object())
            .min(1, "At least one image is required")
            .required("No image was provided"),
        urlKey: yup.string().required("No url key was provided")
    });
    yield schema.validate(values, { abortEarly: false });
});
exports.createProduct = createProduct;
const createCategory = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.object().shape({
        name: yup.string().required("No name was provided"),
        status: yup.string().optional().oneOf(['inactive', 'active'])
    });
    yield schema.validate(values, { abortEarly: false });
});
exports.createCategory = createCategory;
const updateCategory = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.object().shape({
        name: yup.string(),
        status: yup.string().oneOf(['inactive', 'active']),
    });
    yield schema.validate(values, { abortEarly: false });
});
exports.updateCategory = updateCategory;
const sortProducts = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.array().of(yup.object().shape({
        _id: yup.string().required(),
        sort: yup.string().required()
    })).required('req.body is missing the products array');
    yield schema.validate(values, { abortEarly: false });
});
const sortCategories = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.array().of(yup.object().shape({
        _id: yup.string().required(),
        sort: yup.string().required()
    })).required('req.body is missing the categories array');
    yield schema.validate(values, { abortEarly: false });
});
exports.sortCategories = sortCategories;
const addToCart = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yup.object().shape({
        productID: yup.string().required(),
        quantity: yup.string().required()
    });
    yield schema.validate(values, { abortEarly: false });
});
exports.addToCart = addToCart;

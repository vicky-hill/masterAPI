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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteAll = exports.removeItem = exports.updateQuantity = exports.getAllCarts = exports.convertCart = exports.addItem = exports.retrieveCart = void 0;
const Cart = __importStar(require("./carts.functions"));
const carts_model_1 = __importDefault(require("./carts.model"));
const retrieveCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const { cartId } = req.params;
        const cart = yield Cart.getCart(userId, cartId);
        res.json(cart);
    }
    catch (err) {
        next(err);
    }
});
exports.retrieveCart = retrieveCart;
const addItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const cart = yield Cart.addItem(req.body, userId);
        res.json(cart);
    }
    catch (err) {
        next(err);
    }
});
exports.addItem = addItem;
const convertCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        const { userId } = req.user;
        const cart = yield Cart.convertCart(userId, cartId);
        res.json(cart);
    }
    catch (err) {
        next(err);
    }
});
exports.convertCart = convertCart;
const getAllCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield Cart.getAllCarts();
        res.json(carts);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCarts = getAllCarts;
const updateQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const carts = yield Cart.updateQuantity(cartItemId, quantity);
        res.json(carts);
    }
    catch (err) {
        next(err);
    }
});
exports.updateQuantity = updateQuantity;
const removeItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItemId } = req.params;
        const carts = yield Cart.removeItem(cartItemId);
        res.json(carts);
    }
    catch (err) {
        next(err);
    }
});
exports.removeItem = removeItem;
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield carts_model_1.default.deleteMany({});
        res.send('All carts deleted');
    }
    catch (err) {
        next(err);
    }
});
exports.deleteAll = deleteAll;

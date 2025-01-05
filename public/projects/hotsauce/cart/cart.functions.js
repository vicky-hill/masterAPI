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
exports.getCart = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const addToCart = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = data;
    let cart = yield cart_model_1.default.findOne({ userID: userId });
    // If user doesn't have a cart yet, create new cart and save it to user
    if (!cart) {
        cart = yield cart_model_1.default.create({ userID: userId });
        yield users_model_1.default.findByIdAndUpdate(userId, { cart: cart._id });
    }
    const newItems = items
        .filter(item => (!(cart === null || cart === void 0 ? void 0 : cart.items.map(item => item.productID.toString()).includes(item.productID.toString()))));
    const existingItems = items
        .filter(item => (cart === null || cart === void 0 ? void 0 : cart.items.map(item => item.productID.toString()).includes(item.productID.toString())))
        .map(item => (cart === null || cart === void 0 ? void 0 : cart.items.find(cartItem => cartItem.productID.toString() === item.productID.toString())));
    // Existing items: If item already exists in cart, up the quantity
    if (existingItems && existingItems.length) {
        for (let i = 0; i < existingItems.length; i++) {
            const reqItem = items.find(item => item.productID.toString() === existingItems[i].productID.toString());
            cart = yield cart_model_1.default.findOneAndUpdate({ "_id": cart === null || cart === void 0 ? void 0 : cart._id, "items._id": existingItems[i]._id }, { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
        }
    }
    // New Items
    if (newItems && newItems.length) {
        cart = yield cart_model_1.default.findByIdAndUpdate(cart === null || cart === void 0 ? void 0 : cart.id, { $push: { items: newItems } }, { new: true });
    }
    return cart;
});
exports.addToCart = addToCart;
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = { items: [] };
    cart = yield cart_model_1.default.findOne({ userID: userId });
    return cart;
});
exports.getCart = getCart;

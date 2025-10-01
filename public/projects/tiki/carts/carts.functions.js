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
exports.removeItem = exports.updateQuantity = exports.getAllCarts = exports.convertCart = exports.addItem = exports.getCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const carts_model_1 = __importDefault(require("./carts.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const carts_utils_1 = require("./carts.utils");
const validation = __importStar(require("../utils/validation"));
const getCart = (userId, cartId) => __awaiter(void 0, void 0, void 0, function* () {
    let cart;
    // CartId exists
    if (cartId && mongoose_1.default.Types.ObjectId.isValid(cartId)) {
        cart = yield carts_model_1.default.findById(cartId).populate(carts_utils_1.populateProduct);
        // UserId exists
    }
    else if (userId) {
        const userCart = yield carts_model_1.default.findOne({ user: carts_model_1.default }).populate(carts_utils_1.populateProduct);
        if (!userCart) {
            cart = yield carts_model_1.default.create({ user: carts_model_1.default });
            yield users_model_1.default.findByIdAndUpdate(carts_model_1.default, { cart: cart._id });
        }
        else {
            cart = userCart;
        }
        // Create a new guest cart
    }
    else {
        cart = yield carts_model_1.default.create({});
    }
    return cart;
});
exports.getCart = getCart;
const addItem = (item, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation.addToCart(item);
    let cart = yield (0, exports.getCart)(userId);
    if (!cart)
        throw new Error('No cart found');
    const updatedCart = yield (0, carts_utils_1.addOneItem)(item, cart);
    return updatedCart;
});
exports.addItem = addItem;
const convertCart = (userId, cartId) => __awaiter(void 0, void 0, void 0, function* () {
    let guestCart = yield carts_model_1.default.findById(cartId);
    let userCart = (0, exports.getCart)(userId, cartId);
    const items = guestCart && guestCart.items.map(({ product, quantity }) => ({
        product,
        quantity
    }));
    const cart = yield (0, carts_utils_1.addMultipleItems)(items, userCart);
    return cart;
});
exports.convertCart = convertCart;
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield carts_model_1.default.find()
        .sort({ createdAt: -1 })
        .populate(carts_utils_1.populateProduct);
    return carts;
});
exports.getAllCarts = getAllCarts;
const updateQuantity = (cartItemId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield carts_model_1.default.findOneAndUpdate({ "items._id": cartItemId }, { "$set": { "items.$.quantity": quantity } }, { new: true }).populate('items.product');
    return cart;
});
exports.updateQuantity = updateQuantity;
const removeItem = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield carts_model_1.default.findOne({ "items._id": cartItemId });
    if (!cart)
        throw new Error('Cart not found');
    const updatedCart = yield carts_model_1.default.findOneAndUpdate({ _id: cart._id }, { $pull: { items: { _id: cartItemId } } }, { new: true }).populate(carts_utils_1.populateProduct);
    return updatedCart;
});
exports.removeItem = removeItem;

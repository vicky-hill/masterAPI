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
exports.addMultipleItems = exports.addOneItem = exports.populateProduct = void 0;
const carts_model_1 = __importDefault(require("./carts.model"));
exports.populateProduct = [{
        path: 'items.product',
        select: 'name image price images'
    }, {
        path: 'user',
        select: 'email'
    }];
const addOneItem = (item, cart) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedCart;
        const existingItem = cart.items && cart.items.find(existingItem => existingItem.product._id === item.productId);
        if (existingItem) {
            updatedCart = yield carts_model_1.default.findOneAndUpdate({ "_id": cart._id, "items._id": existingItem._id }, { "$set": { "items.$.quantity": existingItem.quantity + item.quantity } }, { new: true }).populate(exports.populateProduct);
        }
        else {
            updatedCart = yield carts_model_1.default.findByIdAndUpdate(cart._id, { $push: { items: { product: item.productId, quantity: item.quantity } } }, { new: true }).populate(exports.populateProduct);
        }
        return updatedCart;
    }
    catch (err) {
        console.log(err);
    }
});
exports.addOneItem = addOneItem;
const addMultipleItems = (items, cart) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedCart;
        if (items) {
            const newItems = items
                .filter((item) => (!cart.items
                .map(cartItem => cartItem.product._id.toString())
                .includes(item.product.toString())));
            const existingItems = items
                .filter(item => (cart.items
                .map(cartItem => cartItem.product._id.toString())
                .includes(item.product.toString())))
                .map(item => (cart.items
                .find(cartItem => cartItem.product._id.toString() === item.product.toString())));
            // Existing items: If item already exists in cart, up the quantity
            if (existingItems && existingItems.length) {
                for (let i = 0; i < existingItems.length; i++) {
                    const reqItem = items.find(item => item.product.toString() === existingItems[i].product._id.toString());
                    updatedCart = yield carts_model_1.default.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id }, { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
                }
            }
            // New Items
            if (newItems && newItems.length) {
                updatedCart = yield carts_model_1.default.findByIdAndUpdate(cart._id, { $push: { items: newItems } }, { new: true }).populate(exports.populateProduct);
            }
        }
        return updatedCart;
    }
    catch (err) {
        console.log(err);
    }
});
exports.addMultipleItems = addMultipleItems;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    productID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'HOTSAUCE_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});
const CartSchema = new mongoose_1.default.Schema({
    userID: {
        type: String,
        required: true
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('HOTSAUCE_Cart', CartSchema);

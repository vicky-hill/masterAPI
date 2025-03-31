"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tiki_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});
const CartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tiki_User',
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Tiki_User', CartSchema);

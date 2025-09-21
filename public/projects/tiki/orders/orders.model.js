"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tiki_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
const OrderShipToSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});
const OrderSchema = new mongoose_1.default.Schema({
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tiki_User',
        required: false
    },
    shipping: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    payment_status: {
        type: String,
        enum: ['uncaptured', 'captured', 'refunded', 'canceled'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    items: [OrderItemSchema],
    shipTo: OrderShipToSchema
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Tiki_Category', OrderSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sort: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    urlKey: {
        type: String,
        unique: true
    },
    images: {
        type: [
            {
                url: String,
                sort: Number,
            }
        ],
        default: []
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'TIKI_Category',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.default = mongoose_1.default.model('Tiki_Product', ProductSchema);

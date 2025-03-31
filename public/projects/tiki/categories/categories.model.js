"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    sort: {
        type: Number
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
CategorySchema.virtual('products', {
    ref: 'Tiki_Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});
CategorySchema.virtual('count').get(function () {
    var _a;
    return (_a = this.products) === null || _a === void 0 ? void 0 : _a.length;
});
exports.default = mongoose_1.default.model('Tiki_Category', CategorySchema);

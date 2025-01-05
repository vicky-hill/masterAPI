"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WordSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    urlKey: String
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Lesprit_List', WordSchema);

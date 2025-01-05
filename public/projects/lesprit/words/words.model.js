"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WordSchema = new mongoose_1.default.Schema({
    language: {
        type: String,
        required: true,
        default: 'Spanish'
    },
    foreign: {
        type: String,
        required: true
    },
    native: {
        type: String,
        required: true
    },
    list: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_List',
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Lesprit_Word', WordSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wordSchema = new mongoose_1.default.Schema({
    english: {
        type: String
    },
    french: {
        type: String
    },
    italian: {
        type: String
    },
    spanish: {
        type: String
    },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Fluent_Image',
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Fluent_Word', wordSchema);

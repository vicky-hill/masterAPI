"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    fsq_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
    plural_name: {
        type: String,
        required: true
    },
    icon: {
        prefix: {
            type: String
        },
        suffix: {
            type: String
        }
    }
}, {
    timestamps: false
});
exports.default = mongoose_1.default.model('Reqdoc_Category', CategorySchema);

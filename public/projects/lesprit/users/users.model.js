"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    languages: {
        type: [{
                foreign: { type: String, required: true },
                native: { type: String, required: true }
            }],
        default: [{ foreign: 'spanish', native: 'english' }],
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Lesprit_User', UserSchema);

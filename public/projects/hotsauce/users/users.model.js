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
    cart: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'HOTSAUCE_Cart'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('HOTSAUCE_User', UserSchema);

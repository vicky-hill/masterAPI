"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firebaseID: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Tiki_User', UserSchema);

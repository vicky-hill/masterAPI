"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false
    },
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    been: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Snapplist_Place'
        }],
    wish: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Snapplist_Place'
        }],
    dislike: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Snapplist_Place'
        }],
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('SNAPPLIST_User', UserSchema);

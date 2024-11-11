"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firebaseID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    team: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_Team'
    },
    role: {
        type: String,
    },
    type: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    deleted: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Reqdoc_User', UserSchema);

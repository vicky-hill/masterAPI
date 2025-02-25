"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firebaseId: {
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
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    lists: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Lesprit_List'
        }],
    verbs: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Lesprit_List'
        }],
    languages: {
        type: [{
                foreign: { type: String, required: true },
                native: { type: String, required: true }
            }],
        default: [{ foreign: 'french', native: 'english' }],
        required: true
    }
}, {
    timestamps: true
});
UserSchema.virtual('phrases', {
    ref: 'Lesprit_Phrase',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});
exports.default = mongoose_1.default.model('Lesprit_User', UserSchema);

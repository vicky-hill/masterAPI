"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const phraseSchema = new mongoose_1.default.Schema({
    verb: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_Verb'
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_User'
    },
    rating: {
        type: Number
    },
    phrase: {
        type: String
    },
    group: {
        type: Number
    }
}, {
    timestamps: false
});
exports.default = mongoose_1.default.model('Lesprit_Phrase', phraseSchema);

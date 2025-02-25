"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const verbSchema = new mongoose_1.default.Schema({
    verb: {
        type: String,
        unique: true
    },
    language: {
        type: String,
        enum: ['french', 'spanish', 'italian']
    },
    tenses: {
        present: [{
                pre: String,
                conjugated: String
            }],
        pastTense: [{
                pre: String,
                conjugated: String
            }]
    },
    priority: {
        type: Number
    },
}, {
    timestamps: false
});
verbSchema.virtual('phrases', {
    ref: 'Lesprit_Phrase',
    localField: '_id',
    foreignField: 'verb',
    justOne: false
});
exports.default = mongoose_1.default.model('Lesprit_Verb', verbSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    words: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Fluent_Word'
        }],
    sort: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Fluent_Group', groupSchema);

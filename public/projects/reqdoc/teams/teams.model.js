"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TeamSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        default: "Team"
    },
    users: [{
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'REQDOC_User'
            },
            role: {
                type: String,
                enum: ['admin', 'user']
            },
        }],
    deleted: {
        type: Date,
        required: false
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
exports.default = mongoose_1.default.model('REQDOC_Team', TeamSchema);

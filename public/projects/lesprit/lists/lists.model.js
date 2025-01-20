"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const ListSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    public: {
        type: Boolean,
        default: false
    },
    image: String,
    urlKey: String
}, {
    timestamps: true
});
ListSchema.pre('save', function (next) {
    this.urlKey = (0, slugify_1.default)(this.title, { lower: true });
    next();
});
exports.default = mongoose_1.default.model('Lesprit_List', ListSchema);

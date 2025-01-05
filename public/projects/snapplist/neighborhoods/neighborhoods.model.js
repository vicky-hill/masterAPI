"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NeighborhoodSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    places: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Snapplist_Place'
        }],
    fsq_ids: [{
            type: String
        }],
    city: {
        type: String
    }
}, {
    timestamps: false
});
exports.default = mongoose_1.default.model('Snapplist_Neighborhood', NeighborhoodSchema);

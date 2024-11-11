"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    team: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_Team'
    },
    deleted: {
        type: Date,
        required: false
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
ProjectSchema.virtual('features', {
    ref: 'Reqdoc_Feature',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});
ProjectSchema.virtual('first_feature').get(function () {
    if (this.features && this.features.length > 0) {
        return this.features[0]._id;
    }
    return null;
});
exports.default = mongoose_1.default.model('Reqdoc_Project', ProjectSchema);

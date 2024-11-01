"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FeatureSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    main_feature: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'REQDOC_Feature'
    },
    sort: {
        type: Number
    },
    deleted: {
        type: Date,
        required: false
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
FeatureSchema.virtual('sub_features', {
    ref: 'REQDOC_Feature',
    localField: '_id',
    foreignField: 'main_feature',
    justOne: false
});
FeatureSchema.virtual('reqs', {
    ref: 'REQDOC_Req',
    localField: '_id',
    foreignField: 'feature',
    justOne: false
});
FeatureSchema.virtual('type').get(function () {
    return this.main_feature ? 'sub' : 'main';
});
exports.default = mongoose_1.default.model('REQDOC_Feature', FeatureSchema);

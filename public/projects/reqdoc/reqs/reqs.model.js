"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReqCommentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        required: false
    },
    deleted: {
        type: Date,
        required: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
const ReqSchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_Project',
        required: true
    },
    feature: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_Feature',
        required: true
    },
    status: {
        type: String,
        enum: ['passed', 'failed']
    },
    changed_req: {
        type: String
    },
    latest_req: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Reqdoc_Req',
        required: false
    },
    deleted: {
        type: Date,
        required: false
    },
    sort: {
        type: Number
    },
    details: {
        type: String,
        required: false
    },
    comments: [ReqCommentSchema]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
ReqSchema.virtual('history', {
    ref: 'Reqdoc_Req',
    localField: 'key',
    foreignField: 'changed_req',
    justOne: false
});
exports.default = mongoose_1.default.model('Reqdoc_Req', ReqSchema);

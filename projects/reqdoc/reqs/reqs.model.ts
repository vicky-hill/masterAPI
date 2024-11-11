import mongoose from 'mongoose'
import { ReqCommentAttributes, ReqAttributes } from '../../../types/reqdoc/attributes.types'

const ReqCommentSchema = new mongoose.Schema<ReqCommentAttributes>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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

const ReqSchema = new mongoose.Schema<ReqAttributes>({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reqdoc_Project',
        required: true
    },
    feature: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
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


export default mongoose.model<ReqAttributes>('Reqdoc_Req', ReqSchema)
const mongoose = require('mongoose')

const ReqCommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_User',
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
})

const ReqSchema = new mongoose.Schema({
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
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    feature: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Feature',
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
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Req',
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
    ref: 'REQDOC_Req',
    localField: 'key',
    foreignField: 'changed_req',
    justOne: false
});

module.exports = mongoose.model('REQDOC_Req', ReqSchema);
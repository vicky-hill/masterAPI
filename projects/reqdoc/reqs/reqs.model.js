const mongoose = require('mongoose');

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
        required: false
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reqdoc_Project',
        required: true
    },
    feature: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reqdoc_Feature',
        required: true
    },
    changed_req: {
        type: String
    },
    sort: {
        type: Number
    }
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


module.exports = mongoose.model('REQDOC_Req', ReqSchema);
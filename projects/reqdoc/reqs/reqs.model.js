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
        required: [true, 'Please enter text for the requirement']
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    feature: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Feature',
        required: [true, 'Feature is missing in the request body']
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
    ref: 'REQDOC_Req',
    localField: 'key',
    foreignField: 'changed_req',
    justOne: false
});


module.exports = mongoose.model('REQDOC_Req', ReqSchema);
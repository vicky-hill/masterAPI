const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    req: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Req',
        required: true
    },
    feature: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Feature',
        required: true
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sort: {
        type: String,
        required: false
    },
    deleted: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('REQDOC_Step', StepSchema);
const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'REQDOC_Project',
        required: true
    },
    main_feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Feature'
    },
    sort: {
        type: Number
    },
    deleted: {
        type: Boolean,
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
})


module.exports = mongoose.model('REQDOC_Feature', FeatureSchema);
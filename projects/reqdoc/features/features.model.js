const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reqdoc_Project',
        required: true
    },
    main_feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reqdoc_Feature'
    },
    sort: {
        type: Number
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

FeatureSchema.virtual('sub_features', {
    ref: 'Reqdoc_Feature',
    localField: '_id',
    foreignField: 'main_feature',
    justOne: false
});

FeatureSchema.virtual('reqs', {
    ref: 'Reqdoc_Req',
    localField: '_id',
    foreignField: 'feature',
    justOne: false
})


module.exports = mongoose.model('REQDOC_Feature', FeatureSchema);
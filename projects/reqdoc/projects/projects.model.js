const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Team'
    },
    deleted: {
        type: Boolean,
        required: false
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ProjectSchema.virtual('features', {
    ref: 'REQDOC_Feature',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});

ProjectSchema.virtual('first_feature').get(function () {
    if (this.features && this.features.length > 0) {
        return this.features[0]._id
    }

    return null;
});



module.exports = mongoose.model('REQDOC_Project', ProjectSchema);
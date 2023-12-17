const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

ProjectSchema.virtual('features', {
    ref: 'REQDOC_Feature',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});


module.exports = mongoose.model('REQDOC_Project', ProjectSchema);
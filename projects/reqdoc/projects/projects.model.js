const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
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
    ref: 'Reqdoc_Feature',
    localField: '_id',
    foreignField: 'project',
    justOne: false
});


module.exports = mongoose.model('REQDOC_Location', ProjectSchema);
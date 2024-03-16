const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Team"
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_User'
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

TeamSchema.virtual('projects', {
    ref: 'REQDOC_Project',
    localField: '_id',
    foreignField: 'team',
    justOne: false
});

module.exports = mongoose.model('REQDOC_Team', TeamSchema);
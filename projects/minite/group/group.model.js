const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


GroupSchema.virtual('private').get(function() {
    return this.members.length === 0;
});



module.exports = mongoose.model('Minite_Group', GroupSchema)
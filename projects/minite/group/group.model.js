const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Minite_User'
    },
    title: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Minite_User'
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Minite_Image'
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
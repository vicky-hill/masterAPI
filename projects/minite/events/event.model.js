const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'MINITE_User'
    },
    year: {
        type: String,
        default: new Date().getFullYear()
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

EventSchema.virtual('images', {
    ref: 'MINITE_Image',
    localField: '_id',
    foreignField: 'event',
    justOne: false
})

module.exports = mongoose.model('MINITE_Event', EventSchema);
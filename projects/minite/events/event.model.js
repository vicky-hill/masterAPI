const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Minite_User'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Minite_Image'
    }],
    year: {
        type: String,
        default: new Date().getFullYear()
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});






module.exports = mongoose.model('Minite_Event', EventSchema)
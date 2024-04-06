const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'MINITE_User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'MINITE_Event',
        required: true
    },
    orientation: {
        type: String,
        enum: ['portrait', 'landscape', 'even']
    },
    version: {
        type: String,
        enum: ['main', 'post', 'crop', 'original', 'alt'],
        default: 'main'
    },
    year: {
        type: String,
        default: new Date().getFullYear()
    },
    width: {
        type: Number,
    },
    height: {
        type: Number
    },
    deleted: {
        type: Date,
        required: false
    },
    // bookmark: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'MINITE_Bookmark',
    //     default: null
    // },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('MINITE_Image', ImageSchema);
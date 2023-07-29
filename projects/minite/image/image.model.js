const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Minite_User',
        required: true
    },
    bookmark: {
        type: mongoose.Schema.ObjectId,
        ref: 'Minite_Bookmark',
        default: null
    },
    orientation: {
        type: String,
        enum: ['portrait', 'landscape', 'even'],
        default: 'portrait'
    },
    version: {
        type: String,
        enum: ['main', 'post', 'crop', 'original'],
        default: 'main'
    },
    year: {
        type: String,
        default: new Date().getFullYear()
    },
    event: {
        type: String
    }
});


module.exports = mongoose.model('Minite_Image', ImageSchema);
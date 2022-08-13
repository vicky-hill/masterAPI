const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
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
    }
});


module.exports = mongoose.model('Minite_Image', ImageSchema);
const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    plural: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
}, {
    timestamps: false
});

module.exports = mongoose.model('SNAPPLIST_category', CategorySchema);
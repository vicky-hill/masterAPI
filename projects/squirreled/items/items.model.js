const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Squirreled_Location',
        required: true
    },
    trash: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Squirreled_Item', ItemSchema);
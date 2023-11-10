const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Squirreled_User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String
    },
    storage_areas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squirreled_Location'
    }],
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        enum : ['main','sub', 'storage'],
        default: 'main'
    },
    lastUsed: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Squirreled_Location', LocationSchema);
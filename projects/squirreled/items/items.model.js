const mongoose = require('mongoose');
require('../utils/jsdoc')

const ItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Squirreled_User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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
});

/**
 * Get item
 * @param {objectId} locationID
 * @returns {array<Location>}
 */
ItemSchema.statics.getItem = async function (itemID, user) {
    const item = await this.findById(itemID).populate('location user');

    if (!item || item.user._id.toString() !== user._id.toString()) {
        return null;
    }

    return item;
};

module.exports = mongoose.model('Squirreled_Item', ItemSchema);
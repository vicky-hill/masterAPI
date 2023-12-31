const mongoose = require('mongoose')
require('../utils/jsdoc')
const Err = require('../../../utils/errorHandler')

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

    if (!item) {
        throw new Err("Item not found", "Item doesn't exist", 404)
    }

    if (user && item.user.toString() !== user._id.toString()) {
        throw new Err("Item not found", "Item doesn't belong to user", 404)
    }

    return item;
};

/**
 * Get items
 * @param {objectId} locationID
 * @returns {array<Location>}
 */
ItemSchema.statics.getItems = async function (user) {
    const items = await this.find({ trash: false, user: user._id })
        .populate('location')
        .sort({ createdAt: -1 });

    if (!items) {
        throw new Err("Items not found", "Item could not be found", 404)
    }

    if (user && item.user.toString() !== user._id.toString()) {
        throw new Err("Item not found", "Item doesn't belong to user", 404)
    }

    return item;
};

module.exports = mongoose.model('Squirreled_Item', ItemSchema);
const mongoose = require('mongoose')
require("../utils/jsdoc")

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
        enum: ['main', 'sub', 'storage'],
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
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

LocationSchema.virtual('items', {
    ref: 'Squirreled_Item',
    localField: '_id',
    foreignField: 'location',
    justOne: false
});

/**
 * Get Location
 * @param {objectId} locationID
 * @param {object} user
 * @returns {Location}
 */
LocationSchema.statics.getLocation = async function (locationID, user) {
    const location = await this.findById(locationID);

    if (!location || location.user.toString() !== user._id.toString()) {
        return null;
    }

    return location;
};

/**
 * Get Storage Areas
 * @param {objectId} locationID
 * @returns {array<Location>}
 */
LocationSchema.statics.getStorageAreas = async function (locationID) {
    const location = await this.findById(locationID)
        .populate({ path: 'storage_areas', select: '-storage_areas' });

    return location.storage_areas;
};

module.exports = mongoose.model('Squirreled_Location', LocationSchema);
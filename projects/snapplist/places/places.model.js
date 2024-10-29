const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    fsq_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    geo: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    location: {
        address: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        postcode: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
}, {
    timestamps: false
});

module.exports = mongoose.model('SNAPPLIST_place', PlaceSchema);
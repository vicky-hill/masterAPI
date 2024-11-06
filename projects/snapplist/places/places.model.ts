import mongoose, { model } from 'mongoose'
import { PlaceAttributes } from '../../../types/snapplist/attribute.types';

const PlaceSchema = new mongoose.Schema<PlaceAttributes>({
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
    timestamps: true
});

export default model<PlaceAttributes>('SNAPPLIST_Place', PlaceSchema);


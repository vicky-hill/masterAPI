import mongoose from 'mongoose'
import { NeighborhoodAttributes } from '../../../types/snapplist/attribute.types'

const NeighborhoodSchema = new mongoose.Schema<NeighborhoodAttributes>({
    name: {
        type: String,
        required: true
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snapplist_Place'
    }],
    fsq_ids: [{
        type: String
    }],
    city: {
        type: String
    }
}, {
    timestamps: false
});

export default mongoose.model<NeighborhoodAttributes>('Snapplist_Neighborhood', NeighborhoodSchema);
import mongoose from 'mongoose'
import { GroupAttributes } from '../../../types/fluent/attribute.types'

const groupSchema = new mongoose.Schema<GroupAttributes>({
    name: {
        type: String,
        required: true
    },
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fluent_Word'
    }],
    sort: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model<GroupAttributes>('Fluent_Group', groupSchema);
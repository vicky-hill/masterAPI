import mongoose from 'mongoose'
import { ListAttributes } from '../../../types/lesprit/attribute.types'

const WordSchema = new mongoose.Schema<ListAttributes>({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    urlKey: String
}, {
    timestamps: true
});

export default mongoose.model<ListAttributes>('Lesprit_List', WordSchema);
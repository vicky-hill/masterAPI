import mongoose from 'mongoose'
import { WordAttributes } from '../../../types/lesprit/attribute.types'

const WordSchema = new mongoose.Schema<WordAttributes>({
    language: {
        type: String,
        required: true,
        default: 'french'
    },
    foreign: {
        type: String,
        required: true
    },
    native: {
        type: String,
        required: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_List',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_User',
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model<WordAttributes>('Lesprit_Word', WordSchema);
import mongoose from 'mongoose'
import { WordAttributes } from '../../../types/fluent-mongoose/attribute.types'

const wordSchema = new mongoose.Schema<WordAttributes>({
    english: {
        type: String
    },
    french: {
        type: String
    },
    italian: {
        type: String
    },
    spanish: {
        type: String
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fluent_Image',
    },
}, {
    timestamps: true
});


export default mongoose.model<WordAttributes>('Fluent_Word', wordSchema);
import mongoose from 'mongoose'
import { VerbAttributes } from '../../../types/lesprit/attribute.types'

const verbSchema = new mongoose.Schema<VerbAttributes>({
    verb: {
        type: String,
        unique: true
    },
    language: {
        type: String,
        enum: ['french', 'spanish', 'italian']
    },
    tenses: {
        present: [{
            pre: String,
            conjugated: String
        }],
        pastTense: [{
            pre: String,
            conjugated: String
        }]
    },
    priority: {
        type: Number
    },
}, {
    timestamps: false
});

verbSchema.virtual('phrases', {
    ref: 'Lesprit_Phrase',
    localField: '_id',
    foreignField: 'verb',
    justOne: false
})


export default mongoose.model<VerbAttributes>('Lesprit_Verb', verbSchema);
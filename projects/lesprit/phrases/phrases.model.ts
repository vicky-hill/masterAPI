import mongoose from 'mongoose'
import { PhraseAttributes } from '../../../types/lesprit/attribute.types'

const phraseSchema = new mongoose.Schema<PhraseAttributes>({
    verb: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_Verb'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_User'
    },
    rating: {
        type: Number
    },
    phrase: {
        type: String
    },
    group: {
        type: Number
    }
}, {
    timestamps: false
});


export default mongoose.model<PhraseAttributes>('Lesprit_Phrase', phraseSchema);
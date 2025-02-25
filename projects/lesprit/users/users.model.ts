import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/lesprit/attribute.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    firebaseId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_List'
    }],
    verbs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesprit_List'
    }],
    languages: {
        type: [{ 
            foreign: { type: String, required: true },
            native: { type: String, required: true }
        }],
        default: [{foreign: 'french', native: 'english'}],
        required: true
    }
}, {
    timestamps: true
});

UserSchema.virtual('phrases', {
    ref: 'Lesprit_Phrase',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})


export default mongoose.model<UserAttributes>('Lesprit_User', UserSchema);
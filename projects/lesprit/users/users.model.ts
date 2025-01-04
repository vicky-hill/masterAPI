import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/lesprit/attribute.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    _id: {
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
    languages: {
        type: [{ 
            foreign: { type: String, required: true },
            native: { type: String, required: true }
        }],
        default: [{foreign: 'spanish', native: 'english'}],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<UserAttributes>('Lesprit_User', UserSchema);
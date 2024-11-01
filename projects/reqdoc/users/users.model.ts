import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/reqdoc/attributes.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    firebaseID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQDOC_Team'
    },
    role:  {
        type: String,
    },
    type: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }, 
    deleted: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.model<UserAttributes>('REQDOC_User', UserSchema)
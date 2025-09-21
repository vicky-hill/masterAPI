import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/tiki/attribute.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    firebaseID: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean
    }
}, {
    timestamps: true
})

export default mongoose.model<UserAttributes>('Tiki_User', UserSchema)
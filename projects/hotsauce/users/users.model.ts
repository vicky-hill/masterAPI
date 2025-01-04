import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/hotsauce/attribute.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOTSAUCE_Cart'
    }
}, {
    timestamps: true
});

export default mongoose.model<UserAttributes>('HOTSAUCE_User', UserSchema);
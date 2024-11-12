import mongoose from 'mongoose'
import { UserAttributes } from '../../../types/snapplist/attribute.types'

const UserSchema = new mongoose.Schema<UserAttributes>({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false
    },
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    been: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snapplist_Place'
    }],
    wish: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snapplist_Place'
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snapplist_Place'
    }],
}, {
    timestamps: true
});

export default mongoose.model<UserAttributes>('SNAPPLIST_User', UserSchema);
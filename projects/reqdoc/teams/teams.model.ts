import mongoose from 'mongoose'
import { TeamAttributes } from '../../../types/reqdoc/attributes.types'

const TeamSchema = new mongoose.Schema<TeamAttributes>({
    name: {
        type: String,
        default: "Team"
    },
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'REQDOC_User'
        },
        role: {
            type: String,
            enum: ['admin', 'user']
        },
    }],
    deleted: {
        type: Date,
        required: false
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export default mongoose.model<TeamAttributes>('REQDOC_Team', TeamSchema)
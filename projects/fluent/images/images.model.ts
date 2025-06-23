import mongoose from 'mongoose'
import { ImageAttributes } from '../../../types/fluent/attribute.types'

const imageSchema = new mongoose.Schema<ImageAttributes>({
    url: {
        type: String
    },
    file: {
        type: String
    },
    name: {
        type: String
    }
}, {
    timestamps: true
});


export default mongoose.model<ImageAttributes>('Fluent_Image', imageSchema);
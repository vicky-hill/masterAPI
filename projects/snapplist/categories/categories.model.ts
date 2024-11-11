import mongoose from 'mongoose'
import { CategoryAttributes } from '../../../types/snapplist/attribute.types'

const CategorySchema = new mongoose.Schema<CategoryAttributes>({
   fsq_id: {
        type: String,
        required: true
    },
   name: {
        type: String,
        required: true
    },
   short_name: {
        type: String,
        required: true
    },
   plural_name: {
        type: String,
        required: true
    },
    icon: {
        prefix: {
            type: String
        },
        suffix: {
            type: String
        }
    }
}, {
    timestamps: false
});

export default mongoose.model<CategoryAttributes>('Reqdoc_Category', CategorySchema);
import mongoose from 'mongoose'
import { ProductAttributes } from '../../../types/tiki/attribute.types'

const ProductSchema = new mongoose.Schema<ProductAttributes>({
    name: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sort: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    urlKey: {
        type: String,
        unique: true
    },
    images: {
        type: [
            {
                url: String,
                sort: Number,
            }
        ],
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TIKI_Category',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

export default mongoose.model<ProductAttributes>('Tiki_Product', ProductSchema)
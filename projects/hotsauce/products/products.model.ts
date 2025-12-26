import mongoose from 'mongoose'
import { ProductAttributes } from '../../../types/hotsauce/attribute.types'

const ProductSchema = new mongoose.Schema<ProductAttributes>({
    name: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    heatLevel: {
        type: String,
        enum: ['mild', 'medium', 'hot', 'extra']
    }
}, {
    timestamps: true
});

export default mongoose.model<ProductAttributes>('HOTSAUCE_Product', ProductSchema);


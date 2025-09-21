import mongoose from 'mongoose'
import { CartItemAttributes, CartAttributes } from '../../../types/tiki/attribute.types'

const CartItemSchema = new mongoose.Schema<CartItemAttributes>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiki_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiki_User',
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});

export default mongoose.model<CartAttributes>('Tiki_User', CartSchema)
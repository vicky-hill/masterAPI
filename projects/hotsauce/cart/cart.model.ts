import mongoose from 'mongoose'
import { CartAttributes, CartItemAttributes } from '../../../types/hotsauce/attribute.types'

const CartItemSchema = new mongoose.Schema<CartItemAttributes>({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HOTSAUCE_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartSchema = new mongoose.Schema<CartAttributes>({
    userID: {
        type: String,
        required: true
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});

export default mongoose.model<CartAttributes>('HOTSAUCE_Cart', CartSchema);
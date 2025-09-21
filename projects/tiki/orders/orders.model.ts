import mongoose from 'mongoose'
import { OrderItemAttributes, OrderShipToAttributes, OrderAttributes } from '../../../types/tiki/attribute.types'

const OrderItemSchema = new mongoose.Schema<OrderItemAttributes>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiki_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

const OrderShipToSchema = new mongoose.Schema<OrderShipToAttributes>({
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
})

const OrderSchema = new mongoose.Schema<OrderAttributes>({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tiki_User',
        required: false
    },
    shipping: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    payment_status: {
        type: String,
        enum: ['uncaptured', 'captured', 'refunded', 'canceled'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    items: [OrderItemSchema],
    shipTo: OrderShipToSchema
}, {
    timestamps: true
});

export default mongoose.model<OrderAttributes>('Tiki_Category', OrderSchema)
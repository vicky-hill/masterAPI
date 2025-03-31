import { Schema, model, Document, ObjectId } from 'mongoose'

interface UserAttributes {
    _id: ObjectId
    firebaseID: string
    email: string
    pending: boolean
    createdAt: Date
    updateAt: Date
}

interface ProductAttributes {
    _id: ObjectId
    name: string
    short_description
    description: string
    price: number
    quantity: number
    sort: number
    status: 'active' | 'inactive'
    urlKey: string
    images: { 
        url: string
        sort: number
    }[]
    category: ObjectId | CategoryAttributes
}

interface CartItemAttributes {
    _id: ObjectId
    product: ProductAttributes
    quantity: number
}

interface CartAttributes {
    _id: ObjectId
    user: ObjectId | UserAttributes
    status: 'open' | 'closed'
    items: CartItemAttributes[]
}

interface CategoryAttributes {
    name: string
    status: 'active' | 'inactive'
    sort: number
    products: Product[]
}

interface OrderItemAttributes {
    _id: ObjectId
    product: ObjectId | ProductAttributes
    quantity: number
    price: number
    total: number
}

interface OrderShipToAttributes {
    _id: ObjectId
    name: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
}

interface OrderAttributes {
    _id: ObjectId
    customer: ObjectId | UserAttributes
    shipping: number
    tax: number
    total: number
    status: 'open' | 'closed'
    payment_status: 'uncaptured' | 'captured' | 'refunded' | 'canceled'
    email: string
    items: OrderItemAttributes[]
    shipTo: OrderShipToAttributes
}


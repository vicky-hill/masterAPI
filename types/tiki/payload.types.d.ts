import { Schema, model, Document, ObjectId } from 'mongoose'

interface AddItem {
    productId: ObjectId
    quantity: number
}

interface CheckoutItem {
    id: number,
    metadata: {
        quantity: number
    }
}

interface Checkout {
    items: CheckoutItem[]
    metadata: {
        cartId: ObjectId
        email: string
    }
    shipping: number
}

interface CreateProduct {
    name: string
    shortDescription: string
    description: string
    images: { url }[]
    category: ObjectId
    price: price
    urlKey: string
}

interface UpdateProduct {
    name: string
    shortDescription: string
    description: string
    images: { url }[]
    category: ObjectId
    price: price
    urlKey: string
}

interface SortProducts {
    _id: ObjectId
    sort: number
}[]

interface CreateUser {
    email: string
    firebaseID: string
}
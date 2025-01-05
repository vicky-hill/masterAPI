import { Schema, model, Document, ObjectId } from 'mongoose'

type HeatLevel = 'mild' | 'medium' | 'hot' | 'extra';

interface UserAttributes extends Document {
    _id: ObjectId
    email: string
    cart?: ObjectId
}

interface CartItemAttributes extends Document {
    productID: ObjectId | ProductAttributes
    quantity: number
}

interface CartAttributes extends Document {
    _id: ObjectId
    userID: string
    items: CartItemAttributes[]
}

interface ProductAttributes extends Document {
    _id: ObjectId
    name: string
    shortDesc: string
    description: string
    image: string
    price: number
    category: string
    createdAt: string
    heatLevel: HeatLevel
}


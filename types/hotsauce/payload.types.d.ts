import { Schema, model, Document, ObjectId } from 'mongoose'
import { HeatLevel } from './attribute.types'

interface AddToCart {
    items: { productID: string, quantity: number }[]
}

interface CreateProduct {
    name: string
    shortDescription: string
    description: string
    image: string
    level: HeatLevel
    category: string
    price: number
}

interface UpdateProduct {
    name: string
    shortDescription: string
    description: string
    image: string
    level: HeatLevel
    category: string
    price: number
}

interface CreateUser {
    _id: string
    email: string
}
import { Schema, model, Document, ObjectId } from 'mongoose'

type Language = { foreign: string, native: string }

interface UserAttributes extends Document {
    _id: ObjectId
    firebaseId: string
    name: string
    email: string
    languages: Language[]
}

interface WordAttributes extends Document {
    language: string
    foreign: string
    native: string
    rating: number
    dueDate: Date
    createdAt: Date
    list: ObjectId | ListAttributes
    user: ObjectId | UserAttributes
}

interface ListAttributes extends Document {
    title: string
    urlKey: string
    createdAt: Date
    user: ObjectId | UserAttributes
}
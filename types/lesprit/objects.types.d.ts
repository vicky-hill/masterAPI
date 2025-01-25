import { Schema, model, Document, ObjectId } from 'mongoose'

type Language = { foreign: string, native: string }

interface UserObject {
    _id: ObjectId
    firebaseId: string
    name: string
    email: string
    lists: ListAttributes[]
    languages: Language[]
}

interface WordObject {
    _id: ObjectId
    language: string
    foreign: string
    native: string
    rating: number
    dueDate: Date
    createdAt: Date
    list: ObjectId | ListAttributes
    user: ObjectId | UserAttributes
}

interface ListObject {
    _id: ObjectId
    title: string
    image: string | null
    public: boolean
    urlKey: string
    createdAt: Date
    user: ObjectId | UserAttributes
}


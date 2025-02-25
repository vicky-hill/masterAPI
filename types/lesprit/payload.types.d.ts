import { Schema, model, Document, ObjectId } from 'mongoose'

interface CreateUser {
    _id: string
    name: string
    email: string
}

interface CreateList {
    title: string
    image?: string
    public?: boolean
}

interface UpdateList {
    title?: string
    image?: string
    public?: boolean
}

interface CreateWord {
    foreign: string
    native: string
    list: string
}

interface UpdateWord {
    foreign?: string
    native?: string
    list?: string
    rating?: number
    dueDate?: number
}

interface CreateVerb {

}

interface UpdateVerb {
    
}
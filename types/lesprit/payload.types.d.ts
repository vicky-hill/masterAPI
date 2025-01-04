import { Schema, model, Document, ObjectId } from 'mongoose'

interface CreateUser {
    _id: string
    name: string
    email: string
}

interface CreateList {
    title: string
}

interface UpdateList {
    title: string
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
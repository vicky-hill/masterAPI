import { Schema, model, Document } from 'mongoose'

interface CreateNote {
    page: string
    note: string
}

interface UpdateNote {
    page: string
    note: string
    done: boolean
}
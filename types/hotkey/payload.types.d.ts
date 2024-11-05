import { Schema, model, Document } from 'mongoose'


interface CreateNote {
    page: string
    note: string
}
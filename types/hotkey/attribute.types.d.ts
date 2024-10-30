import { Schema, model, Document } from 'mongoose'

interface NotesAttributes extends Document {
    page: string
    note: string
    done: string
}


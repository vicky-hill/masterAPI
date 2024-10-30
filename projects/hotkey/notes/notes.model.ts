import { Schema, model } from 'mongoose'
import { NotesAttributes } from '../../../types/hotkey/attribute.types'

const NotesSchema = new Schema<NotesAttributes>({
    page: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    done: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export default model<NotesAttributes>('HOTKEY_notes', NotesSchema)
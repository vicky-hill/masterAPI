import { NotesAttributes } from '../../../types/hotkey/attribute.types'
import { CreateNote, UpdateNote } from '../../../types/hotkey/payload.types'
import throwError from '../../../utils/throwError'
import Notes from './notes.model'

export const getNotes = async () => {
    const notes: NotesAttributes[] = await Notes.find();

    return notes;
}

export const getNoteById = async (noteId: string) => {
    const note: NotesAttributes | null = await Notes.findById(noteId);
    if (!note) return throwError('Note not found');

    return note;
}

export const createNote = async (data: CreateNote) => {
    const note: NotesAttributes | null = await Notes.create({ ...data, done: false });

    return note;
}

export const updateNote = async (noteId: string, data: UpdateNote) => {
    const note: NotesAttributes | null = await Notes.findByIdAndUpdate(
        noteId, data, { new: true }
    );

    return note;
}

export const deleteNote = async (noteId: string) => {
    const note = await Notes.findByIdAndDelete(noteId);

    return note;
}
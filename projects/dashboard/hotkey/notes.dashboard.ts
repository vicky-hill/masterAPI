import Note from '../../hotkey/notes/notes.model'
import { Request, Response, NextFunction } from 'express'
import { NotesAttributes } from '../../../types/hotkey/attribute.types'  
import { CreateNote, UpdateNote } from '../../../types/hotkey/payload.types'
import throwError from '../../../utils/throwError'

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes: NotesAttributes[] = await Note.find();
        res.json(notes);
    } catch (err: any) {
        err.ctrl = getNotes;
        next(err);
    }
}

export const getNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;

        const note: NotesAttributes | null = await Note.findById(noteId);
        if (!note) return throwError('Note not found');
        
        res.json(note);
    } catch (err: any) {
        err.ctrl = getNote;
        next(err);
    }
}

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateNote;

        const note: NotesAttributes | null = await Note.create(req.body);
        
        res.json(note);    
    } catch (err: any) {
        err.ctrl = createNote;
        next(err);
    }
}

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateNote;

        const { noteId } = req.params;

        const updatedNote: NotesAttributes | null = await Note.findByIdAndUpdate(
            noteId, req.body, { new: true }
        );
    
        res.json(updatedNote);    
    } catch (err: any) {
        err.ctrl = updateNote;
        next(err);
    }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;

        const note = await Note.findByIdAndDelete(noteId);
        
        res.json(note);    
    } catch (err: any) {
        err.ctrl = deleteNote;
        next(err);
    }
}
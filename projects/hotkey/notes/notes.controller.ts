import { Request, Response, NextFunction } from 'express'
import { NotesAttributes } from '../../../types/hotkey/attribute.types'
import throwError from '../../../utils/throwError'
import Notes from './notes.model'

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes: NotesAttributes[] = await Notes.find();
        res.json(notes);
    
    } catch (err: any) {
        err.ctrl = getNotes;
        next(err);
    }
}

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;

        const note: NotesAttributes | null = await Notes.findById(noteId);
        if (!note) return throwError('Note not found');
        
        res.json(note);
    
    } catch (err: any) {
        err.ctrl = getNoteById;
        next(err);
    }
}

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note: NotesAttributes | null = await Notes.create({ ...req.body, done: false });
        res.json(note);    
    } catch (err: any) {
        err.ctrl = getNoteById;
        next(err);
    }
}

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;

        const updatedNote: NotesAttributes | null = await Notes.findByIdAndUpdate(
            noteId, req.body, { new: true }
        );
    
        res.json(updatedNote);    
    } catch (err: any) {
        err.ctrl = getNoteById;
        next(err);
    }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;

        const note = await Notes.findByIdAndDelete(noteId);
        
        res.json(note);    
    } catch (err: any) {
        err.ctrl = getNoteById;
        next(err);
    }
}
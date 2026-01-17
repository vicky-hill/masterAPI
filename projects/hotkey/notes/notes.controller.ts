import { Request, Response, NextFunction } from 'express'
import * as Notes from './notes.functions'
import { CreateNote } from '../../../types/hotkey/payload.types'

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await Notes.getNotes();
        res.json(notes);
    } catch (err: any) {
        next(err);
    }
}

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;
        const note = await Notes.getNoteById(noteId as string);
        res.json(note);
    } catch (err: any) {
        next(err);
    }
}

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateNote;
        const note = await Notes.createNote(req.body);
        res.json(note);
    } catch (err: any) {
        next(err);
    }
}

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;
        const updatedNote = await Notes.updateNote(noteId as string, req.body);
        res.json(updatedNote);
    } catch (err: any) {
        next(err);
    }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { noteId } = req.params;
        const note = await Notes.deleteNote(noteId as string);
        res.json(note);
    } catch (err: any) {
        next(err);
    }
}
import { Request, Response, NextFunction } from 'express'
import { NotesAttributes } from '../../../types/hotkey/attribute.types'
import Notes from './notes.model'


const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes: NotesAttributes[] = await Notes.find();
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

export default {
    getNotes
}
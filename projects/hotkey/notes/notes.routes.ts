import express from 'express'
const router: any = express.Router()

import { createNote, deleteNote, getNoteById, getNotes, updateNote } from './notes.controller'

// api/notes
router.route('/').get(getNotes)
router.route('/').post(createNote)


// api/notes/:noteId
router
    .route('/:noteId')
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote)


export default router; 
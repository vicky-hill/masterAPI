import express from 'express'
const router = express.Router()

import notesCtrl from './notes.controller'

/**
 * @route /api/notes
 * @get get all notes
 * @post save a notes
 */
router
    .route('/')
    .get(notesCtrl.getNotes)
    // .post(notesCtrl.createNotes)

/**
 * @route /api/notes/:notesId
 * @get notes
 * @update notes
 * @delete notes
 */
router
    .route('/:notesId')
    // .get(notesCtrl.getNotesById)
    // .put(notesCtrl.updateNotes)
    // .delete(notesCtrl.deleteNotes)


export default router; 
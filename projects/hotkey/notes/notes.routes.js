const express = require('express')
const router = express.Router()

const notesCtrl = require('./notes.controller.js')

/**
 * @route /api/notes
 * @get get all notes
 * @post save a notes
 */
router
    .route('/')
    .get(notesCtrl.getNotes)
    .post(notesCtrl.createNotes)

/**
 * @route /api/notes/:notesId
 * @get notes
 * @update notes
 * @delete notes
 */
router
    .route('/:notesId')
    .get(notesCtrl.getNotesById)
    .put(notesCtrl.updateNotes)
    .delete(notesCtrl.deleteNotes)


module.exports = router; 
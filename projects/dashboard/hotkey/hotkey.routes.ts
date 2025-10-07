import express from 'express'
import {getNotes, getNote, createNote, updateNote, deleteNote} from './notes.dashboard'

const router: any = express.Router()

/* ====================================
   Notes @ api/dashboard/hotkey/notes
==================================== */

router.route('/notes').get(getNotes)
router.route('/notes').post(createNote)

router.route('/notes/:noteId').get( getNote)
router.route('/notes/:noteId').delete(deleteNote)
router.route('/notes/:noteId').put(updateNote)

export default router;
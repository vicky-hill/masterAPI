import express, { Router } from 'express'
import { createWord, getWordsByLanguage } from './words.controller'

const router: Router = express.Router()

/* ====================================
   @ api/fluent/words
==================================== */

router.route('/').post(createWord)
router.route('/:language').get(getWordsByLanguage)


export default router;
import express from 'express'
import { createAdjectives, createWords, getAllWords } from './words.controller'

const router = express.Router()

/* ====================================
   @ /fluent/words
==================================== */

router.get('/', getAllWords);
router.post('/', createWords)
router.post('/adjectives', createAdjectives);


export default router;
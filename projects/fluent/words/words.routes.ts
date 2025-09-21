import express from 'express'
import { createAdjectives, getAllWords } from './words.controller'

const router = express.Router()

/* ====================================
   @ /fluent/words
==================================== */

router.get('/', getAllWords);
router.post('/adjectives', createAdjectives);

export default router;
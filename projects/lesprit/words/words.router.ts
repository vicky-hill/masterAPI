import express from 'express'
import { protect } from '../utils/middleware'
import { getWords, getWord, createWord, updateWord, deleteWord, getReview, importWords } from './words.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/lesprit/words
==================================== */

router.route('/').get(protect, getWords)
router.route('/').post(protect, createWord)

router.route('/review').get(protect, getReview)
router.route('/import').get(protect, importWords)

router.route('/:wordId').get(protect, getWord)
router.route('/:wordId').post(protect, createWord)
router.route('/:wordId').put(protect, updateWord)
router.route('/:wordId').delete(protect, deleteWord)

export default router;
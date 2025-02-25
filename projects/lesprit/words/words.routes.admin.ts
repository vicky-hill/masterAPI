import express from 'express'
import { protect } from '../utils/middleware'
import { getWords } from './words.controller'

const router: any = express.Router()

/* ====================================
   @ api/lesprit/admin/words
==================================== */

router.route('/').get(protect, getWords)


export default router;
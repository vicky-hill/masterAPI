import express, { Router } from 'express'
import { protect } from '../utils/middleware'
import { getVerb, createVerb, updateVerb, deleteVerb } from './verbs.controller'

const router: Router = express.Router();

/* ====================================
   @ api/lesprit/verbs
==================================== */

router.route('/').post(protect, createVerb)

router.route('/:verbId').get(protect, getVerb)
router.route('/:verbId').delete(protect, deleteVerb)
router.route('/:verbId').put(protect, updateVerb)


export default router;
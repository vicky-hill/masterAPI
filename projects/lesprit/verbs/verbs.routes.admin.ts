import express, { Router } from 'express'
import { protect } from '../utils/middleware'
import { getAdminVerbs, createVerb, deleteVerb } from './verbs.controller'

const router: Router = express.Router();

/* ====================================
   @ api/lesprit/verbs/admin
==================================== */

router.route('/').get(protect, getAdminVerbs)
router.route('/').post(protect, createVerb)

router.route('/:verbId').delete(protect, deleteVerb)


export default router;
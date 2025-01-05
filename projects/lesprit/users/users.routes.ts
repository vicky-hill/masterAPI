import express from 'express'
import { protect } from '../utils/middleware'
import { createUser, getUser } from './users.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/lesprit/user
==================================== */

router.route('/').get(protect, getUser)
router.route('/').post(createUser)



export default router;
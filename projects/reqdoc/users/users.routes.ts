import express from 'express'
import { createUser, getUser, getUsers } from './users.controller'

const router: any = express.Router()

/* ====================================
   Users @ api/reqdoc/user
==================================== */

router.route('/all').get(getUsers)

router.route('/').get(getUser)
router.route('/').post(createUser)



export default router;
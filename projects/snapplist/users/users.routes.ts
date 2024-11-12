import express from 'express'
import { createUser, getUser, getUsers } from './users.controller'

const router: any = express.Router()

/* ===================================
   Users @ /api/snapplist/user/all
=================================== */

router.route('/all').get(getUsers);


/* ===================================
   Users @ /api/snapplist/user
=================================== */

router.route('/').get(getUser);
router.route('/').post(createUser);

export default router;
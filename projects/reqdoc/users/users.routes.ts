import express from 'express'
import { createUser, getUser, getUsers } from './users.controller'

const router: any = express.Router()

/** @get /api/reqdoc/user/all */
router.route('/all').get(getUsers)

/**
 * @route /api/squirreled/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(getUser)
    .post(createUser)

export default router;
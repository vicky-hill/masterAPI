import express, { Router } from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser, getCurrentUser } from './users.controller'
import { protect } from '../utils/middleware';

const router: Router = express.Router();

/* ====================================
   @ /users
==================================== */

router.route('/').get(getUsers)
router.route('/').post(createUser)

router.route('/current').get(protect, getCurrentUser)

router.route('/:userId').get(getUser)
router.route('/:userId').put(updateUser)
router.route('/:userId').delete(deleteUser)


export default router;
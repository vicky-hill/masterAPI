import express, { Router } from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser, getCurrentUser, loginUser } from './users.controller'
import {protect, isAdmin} from '../utils/middleware'


const router: Router = express.Router();

/* ====================================
   @ /users
==================================== */

router.route('/').get(protect, isAdmin, getUsers)
router.route('/').post(createUser)

router.route('/current').get(protect, getCurrentUser)
router.route('/login').post(protect, loginUser)

router.route('/:userId').get(getUser)
router.route('/:userId').put(protect, isAdmin, updateUser)
router.route('/:userId').delete(deleteUser)


export default router;
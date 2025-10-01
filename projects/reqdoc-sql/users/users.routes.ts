import express, { Router } from 'express'
import {getUser } from './users.controller'

const router: Router = express.Router();

/* ====================================
   @ /users
==================================== */

router.route('/:userId').get(getUser)


export default router;
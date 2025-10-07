import express, { Router } from 'express'
import { getTeams } from './teams.controller'
import { protect } from '../utils/middleware'

const router: Router = express.Router();

/* ====================================
   @ /teams
==================================== */

router.route('/').get(protect, getTeams)


export default router;
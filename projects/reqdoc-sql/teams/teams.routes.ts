import express, { Router } from 'express'
import { addUserToCurrentTeam, getTeams, removeUserFromCurrentTeam } from './teams.controller'
import { protect } from '../utils/middleware'

const router: Router = express.Router();

/* ====================================
   @ /teams
==================================== */

router.route('/').get(protect, getTeams)

router.route('/add/:userId').put(protect, addUserToCurrentTeam)
router.route('/remove/:userId').put(protect, removeUserFromCurrentTeam)


export default router;
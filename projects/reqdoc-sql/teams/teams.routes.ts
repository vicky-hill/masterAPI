import express, { Router } from 'express'
import { getTeams } from './teams.controller'

const router: Router = express.Router();

/* ====================================
   @ /teams
==================================== */

router.route('/').get(getTeams)


export default router;
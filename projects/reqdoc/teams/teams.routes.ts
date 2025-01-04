import express from 'express'
import { protect } from '../utils/middleware'
import { createTeam, getTeams, getUserTeams, switchUserTeam, updateTeam } from './teams.controller';

const router: any = express.Router()

/* ====================================
   Teams @ api/reqdoc/team
==================================== */

router.route('/user').get(protect, getUserTeams);
router.route('/switch/:teamId').put(protect, switchUserTeam);
router.route('/:teamId').put(protect, updateTeam);

router.route('/').post(createTeam)
router.route('/').get(getTeams)

export default router;
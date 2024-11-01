import express from 'express'
import { protect } from '../utils/middleware'
import { createTeam, getTeams, getUserTeams, switchUserTeam, updateTeam } from './teams.controller';

const router: any = express.Router()

/** @get /api/reqdoc/teams/user */
router.route('/user').get(protect, getUserTeams);
router.route('/switch/:teamID').put(protect, switchUserTeam);
router.route('/:teamID').put(protect, updateTeam);

/**
 * @route /api/reqdoc/teams
 * @post create team
 */
router
    .route('/')
    .post(createTeam)
    .get(getTeams)

export default router;
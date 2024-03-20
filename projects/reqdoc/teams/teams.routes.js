const express = require('express')
const router = express.Router()
const { protect } = require('../utils/middleware')

const teamCtrl = require('./teams.controller');

/** @get /api/reqdoc/teams/user */
router.route('/user').get(protect, teamCtrl.getUserTeams);

/**
 * @route /api/reqdoc/teams
 * @post create team
 */
router
    .route('/')
    .post(teamCtrl.createTeam)
    .get(teamCtrl.getAllTeams)



module.exports = router; 
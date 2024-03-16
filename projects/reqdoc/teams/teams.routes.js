const express = require('express')
const router = express.Router()

const teamCtrl = require('./teams.controller');

/**
 * @route /api/reqdoc/teams
 * @post create team
 */
router
    .route('/')
    .post(teamCtrl.createTeam)



module.exports = router; 
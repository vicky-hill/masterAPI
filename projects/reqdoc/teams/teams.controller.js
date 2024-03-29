const Team = require('./teams.model')
const User = require('../users/users.model')
const validate = require('../utils/validation')

/**
 * Create Team
 * @property {string} req.body.name 
 * @property {string} req.body.user
 * @returns {Team}
 */
const createTeam = async (req, res, next) => {
    try {
        await validate.createTeam(req.body);

        const team = await Team.create({ name: req.body.name })
        const updatedTeam = await Team.findByIdAndUpdate(
            team._id,
            { $push: { users: req.body.user } },
            { new: true }
        )

        res.status(201).json(updatedTeam);
    } catch (err) {
        err.errorCode = 'teams_001';
        next(err);
    }
}

/**
 * Get all teams
 * @returns {array<User>}
 */
const getAllTeams = async (req, res, next) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        err.errorCode = 'teams_002';
        next(err);
    }
}

/**
 * Update Team
 * @param teamID
 * @property req.body.name
 * @returns {<Team />}
 */
const updateTeam = async (req, res, next) => {
    try {
        const { teamID } = req.params;

        const team = await Team.findByIdAndUpdate(teamID, req.body, { new: true })
            .populate({
                path: 'users.user',
                select: 'email',
            })

        res.json(team);
    } catch (err) {
        err.errorCode = 'teams_003';
        next(err);
    }
}

/**
 * Get all teams
 * @returns {array<User>}
 */
const getUserTeams = async (req, res, next) => {
    try {
       const { userID } = req.user;

        const teams = await Team.find({ 'users.user': userID }).populate({
            path: 'users.user',
            select: 'email',
        })

        res.json({ data: teams })
    } catch (err) {
        err.errorCode = 'teams_004';
        next(err);
    }
}

/**
 * Get all teams
 * @param teamID
 * @returns {array<User>}
 */
const switchUserTeam = async (req, res, next) => {
    try {
        const { teamID } = req.params;
       const { userID } = req.user;

        const team = await Team.findById(teamID).populate({
            path: 'users.user',
            select: 'email',
        })

        const teamUser = team.users.find(user =>
            user.user._id.toString() === userID.toString()
        )

        const user = await User.findByIdAndUpdate(userID,
            { role: teamUser.role, team: team._id },
            { new: true }
        );

        res.json(user)
    } catch (err) {
        err.errorCode = 'teams_005';
        next(err);
    }
}


module.exports = {
    createTeam,
    getAllTeams,
    getUserTeams,
    switchUserTeam,
    updateTeam
}
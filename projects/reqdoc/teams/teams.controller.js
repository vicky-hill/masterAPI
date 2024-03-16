const Team = require('./teams.model')
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



module.exports = {
 createTeam
}
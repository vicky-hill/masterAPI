const User = require('./users.model');

/**
 * Save a new user
 * @property {string} req.body._id 
 * @property {string} req.body.email
 * @returns user {}
 */
async function saveUser(req, res, next) {
    try {
        const newUser = await User.create(req.body);
        const user = await User.findById(newUser._id);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
 saveUser
}
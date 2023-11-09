const User = require('./users.model');

/**
 * Save a new user
 * @property {string} req.body._id 
 * @property {string} req.body.email
 * @property {string} req.body.firebaseID
 * @returns user { _id, firebaseID, email, createdAt }
 */
async function createUser(req, res, next) {
    try {
        const newUser = await User.create(req.body);
        const user = await User.findById(newUser._id);

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

/**
 * Get current user
 * @header x-auth-token
 * @returns user { _id, email, createdAt }
 */
async function getUser(req, res, next) {
    try {
    console.log('kdjf')
        const user = await User.findById(req.user._id);
        
        if(!user) {
            res.status(404).json({ msg: 'No user found' })
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
 createUser,
 getUser
}
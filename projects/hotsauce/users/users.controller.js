const User = require('./users.model');

/**
 * Save a new user
 * @property {string} req.body._id 
 * @property {string} req.body.email
 * @returns user { _id, email, createdAt }
 */
const saveUser = async (req, res, next) => {
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
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userID).populate('cart');

        if (!user) {
            res.status(404).json({ msg: 'No user found' })
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    saveUser,
    getUser
}
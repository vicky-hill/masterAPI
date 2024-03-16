const User = require('./users.model');
const jwt_decode = require('jwt-decode')

/**
 * Get all users
 * @returns {array<User>}
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        err.errorCode = 'users_001';
        next(err);
    }
}

/**
 * Save a new user
 * @property {string} req.body._id 
 * @property {string} req.body.email
 * @property {string} req.body.firebaseID
 * @returns user { _id, firebaseID, email, createdAt }
 */
const createUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const user = await User.findById(newUser._id);

        res.status(201).json(user);
    } catch (err) {
        err.errorCode = 'users_002';
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

        const token = req.header('x-auth-token');

        if (!token) {
            res.json(null);
            return;
        }

        const decodedToken = jwt_decode(token);
        const user = await User.findOne({ firebaseID: decodedToken.user_id });

        if (!user) {
            res.json(null);
            return;
        }

        res.json(user);
    } catch (err) {
        next({ ...err, errorCode: 'users_003' })
        next(err);
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getUser
}
const User = require('./users.model')
const jwt_decode = require('jwt-decode')
const validate = require('../utils/validation')

/**
 * Get all users
 * @returns {array<User>}
 */
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('-firebaseID -createdAt -updatedAt -__v')
        res.json(users);
    } catch (err) {
        err.errorCode = 'users_001';
        next(err);
    }
}

/**
 * Save a new user
 * @property {string} req.body.email
 * @property {string} req.body.firebaseID
 * @returns user { _id, firebaseID, email, createdAt }
 */
const createUser = async (req, res, next) => {
    try {
        const name = req.body.email.split('@')[0];
        const body = { ...req.body, name }

        await validate.createUser(body);

        const newUser = await User.create(body);
        const user = await User.findById(newUser._id)
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(201).json(user);
    } catch (err) {
        err.errorCode = 'users_002';
        next(err);
    }
}

/**
 * Update user
 * @property {string} req.body.name
 * @returns {User}
 */
const updateUser = async (req, res, next) => {
    try {
        const { userID } = req.user;

        await validate.updateUser(req.body);

        const updatedUser = await User.findByIdAndUpdate(userID, req.body, { new: true })
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(200).json(updatedUser);
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
        const user = await User.findOne({ firebaseID: decodedToken.user_id })
            .select('-firebaseID -createdAt -updatedAt -__v');

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

// Todo :: create endpoint to select team & role

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getUser
}
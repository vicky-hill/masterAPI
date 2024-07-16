const User = require('./users.model')
const Team = require('../teams/teams.model')
const jwt_decode = require('jwt-decode')
const validate = require('../utils/validation')

const UserController = () => {
    getUser()
    getUsers() 
    createUser()
    inviteUser()
}

/**
 * Get all users
 * @returns {array<User>}
 */
const getUsers = async (req, res, next) => {
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
 * @returns {User}
 */
const createUser = async (req, res, next) => {
    try {
        const name = req.body.email.split('@')[0];
        const body = { ...req.body, name }

        await validate.createUser(body);

        const newUser = await User.create(body);
        const newTeam = await Team.create({
            name: 'New Team',
            users: [{ user: newUser._id, role: 'admin' }]
        })

        await User.findByIdAndUpdate(
            newUser._id,
            { team: newTeam._id, role: 'admin' },
            { new: true }
        )

        const user = await User.findById(newUser._id)
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(201).json(user);
    } catch (err) {
        err.errorCode = 'users_002';
        next(err);
    }
}

/**
 * Invite user to team
 * @property {string} req.body.team
 * @property {string} req.body.email
 * @property {string} req.body.firebaseID
 * @returns {User}
 */
const inviteUser = async (req, res, next) => {
    try {
        const { userID } = req.user;
        const { team } = req.body;

        if (userID) {
            await Team.findByIdAndUpdate(
                team,
                { $push: { users: { user: userID, role: 'user' } } },
                { new: true }
            )

            const user = await User.findById(user)
                .select('-firebaseID -createdAt -updatedAt -__v');

            return res.json(user);
        } 

    } catch (err) {
        err.errorCode = 'users_003';
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
        err.errorCode = 'users_004';
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
        next({ ...err, errorCode: 'users_005' })
        next(err);
    }
}

// Todo :: create endpoint to select team & role

module.exports = {
    getUsers,
    createUser,
    updateUser,
    getUser,
    inviteUser
}
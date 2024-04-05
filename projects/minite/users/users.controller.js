const User = require('./users.model');
const Bookmark = require('../bookmarks/bookmarks.model');
require('dotenv').config();
const jwt_decode = require('jwt-decode')
const validate = require('../utils/validation');
const { getNewImageID } = require('../image/image.utils');


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
 * Create user
 * @property {string} req.body.email
 * @property {string} req.body.firebaseID
 * @returns {User}
 */
const createUser = async (req, res, next) => {
    try {
        const name = req.body.email.split('@')[0];
        const body = { ...req.body, name }

        await validate.createUser(body);

        const { _id } = await User.create(body);

        const user = await User.findById(_id)
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(201).json(user);


        // Add default bookmarks
        // const bookmarks = [
        //     { user: user.id, sort: 0, name: 'All Photos', icon: 'images-outline', primary: true },
        //     { user: user.id, sort: 1, name: 'Favorites', icon: 'heart-outline' },
        //     { user: user.id, sort: 2, name: 'Notes', icon: 'clipboard-outline' },
        //     { user: user.id, sort: 3, name: 'Temporary', icon: 'time-outline' }
        // ]

        // const createBookmark = async (bookmark) => {
        //     await Bookmark.create(bookmark);
        // }

        // bookmarks.forEach(bm => createBookmark(bm));

    } catch (err) {
        err.errorCode = 'users_002';
        next(err);
    }
}


/**
 * Get current user
 * @header x-auth-token
 * @returns user { _id, email }
 */
const getUser = async (req, res, next) => {
    try {

        const token = req.header('x-auth-token');

        if (!token) {
            res.json(null);
            return;
        }

        const decodedToken = jwt_decode(token);

        let user = await User.findOne({ firebaseID: decodedToken.user_id })
            .select('-firebaseID -createdAt -updatedAt -__v');

        if (!user) {
            res.json(null);
            return;
        }

        user = user.toObject()
        user.nextImageID = await getNewImageID(user._id);

        res.json(user);
    } catch (err) {
        err.errorCode = 'users_003';
        next(err);
    }
}

/**
 * Delete User
 *
 */
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        err.errorCode = 'users_004';
        next(err);
    }
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    getAllUsers
}
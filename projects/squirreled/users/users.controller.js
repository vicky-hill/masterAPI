const User = require('./users.model');
const jwt_decode = require('jwt-decode')

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
        
        const token = req.header('x-auth-token');

        if (!token) return res.json(null);
        
        const decodedToken = jwt_decode(token);
        const user = await User.findOne({ firebaseID: decodedToken.user_id });
        
        if(!user) res.json(null);
        
        res.json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
 createUser,
 getUser
}
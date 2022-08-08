const User = require('./auth.model');
const Bookmark = require('../bookmarks/bookmarks.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* ===================================
   Register
=================================== */
async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ name });
        // let userEmail = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'Username is taken!' });
        }

        // if (userEmail) {
        //     return res.status(400).json({ msg : 'Email is already registered!' });
        // }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { name: user.name, id: user.id } }

        // Add default bookmarks
        const bookmarks = [
            { user: user.id, sort: 0, name: 'All Photos', icon: 'images-outline', primary: true },
            { user: user.id, sort: 1, name: 'Favorites', icon: 'heart-outline' },
            { user: user.id, sort: 2, name: 'Notes', icon: 'clipboard-outline' },
            { user: user.id, sort: 3, name: 'Temporary', icon: 'time-outline' }
        ]

        async function createBookmark(bookmark) {
            await Bookmark.create(bookmark);
        }

        bookmarks.forEach(bm => createBookmark(bm));


        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something didnt work right' });
    }
}


/* ===================================
   Login
=================================== */
async function login(req, res) {
    try {
        const { name, password } = req.body;

        let user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({ msg: 'Username or password invalid!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Username or password invalid!' });
        }

        const payload = { user: { name: user.name, id: user._id } };

        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })
    } catch (err) {
        res.status(500).json({ msg: 'Something didnt work right' });
    }
}

/* ===================================
   Get user
=================================== */
async function getUser(req, res) {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json(user);
}


/* ===================================
   Delete User
=================================== */
async function deleteUser(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
}

/* ===================================
   Get all users
=================================== */
async function getAllUsers (req, res) {
    try {
        const users = await User.find({}).select('_id name');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Something didnt work right' });
    }
}

module.exports = {
    register,
    login,
    getUser,
    deleteUser,
    getAllUsers
}
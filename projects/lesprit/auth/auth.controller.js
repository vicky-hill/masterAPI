const User = require('./auth.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* ===================================
   Register
=================================== */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ name });
        // let userEmail = await User.findOne({ email });
    
        if (user) {
            return res.status(400).json({ msg : 'Username is taken!' });
        }

        // if (userEmail) {
        //     return res.status(400).json({ msg : 'Email is already registered!' });
        // }
    
        user = new User({ name, email, password });
 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    
        await user.save();
    
        const payload = { user: {name: user.name, id: user.id} }
    
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if(err) throw err;
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
const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        let user = await User.findOne({ name });
    
        if (!user) {
            return res.status(400).json({ msg: 'Username or password invalid!'});
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(400).json({ msg: 'Username or password invalid!'});
        }
    
        const payload = { user: {name: user.name, id: user._id} };
    
        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if(err) throw err;
            res.json({ token });
        })
    } catch (err) {
        res.status(500).json({ msg: 'Something didnt work right'});
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json(user);
}


/* ===================================
   Change Languages
=================================== */
const changeLanguages = async (req, res) => {
    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!updatedUser) {
            return res.status(404).json({msg: "User not found"});
        }

        res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err);
    }
}


/* ===================================
   Delete User
=================================== */
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
        return res.status(404).json({msg: "User not found"});
    }

    res.status(200).json(user);
}

module.exports = {
    register, 
    login, 
    getUser,
    deleteUser,
    changeLanguages
}
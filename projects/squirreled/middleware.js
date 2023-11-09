const jwt_decode = require('jwt-decode')
const User = require('./users/users.model')
const Item = require('./items/items.model')

// Protect routes 
exports.protect = async (req, res, next) => {

    // Get token in the header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt_decode(token);

        const user = await User.findOne({ firebaseID: decoded.user_id });

        if (!user) {
            return res.status(401).json({ msg: 'No user found' });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

};

exports.getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('location user');

        if (!item || item.user._id.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: "Item not found" });
        }

        req.item = item;

        next();
    } catch (err) {
        console.log(err);
    }
}
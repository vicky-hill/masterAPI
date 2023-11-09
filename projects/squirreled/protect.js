const jwt_decode = require('jwt-decode')
const User = require('./users/users.model')

// Protect routes 
exports.protect = async (req, res, next) => {

        // Get token in the header
        const token = req.header('x-auth-token');

        // Check if no token
        if(!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
    
        // Verify token
        try {
            const decoded = jwt_decode(token);

            const user = await User.findOne({ userID: decoded.user_id });

            req.user = user;
            
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }

};
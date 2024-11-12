import { Response, NextFunction } from 'express'
import jwt_decode from 'jwt-decode'
import User from '../users/users.model'

// Protect all routes 
export const protect = async (req: any, res: Response, next: NextFunction) => {

    // Get token in the header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded: any = jwt_decode(token);

        const user = await User.findOne({ firebaseID: decoded.user_id });

        if (!user) {
            return res.status(401).json({ msg: 'No user found' });
        }

        req.user = user;
        req.user.userID = user._id;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

import { Response, NextFunction } from 'express'
import jwt_decode from 'jwt-decode'
import User from '../users/users.model'

// Protect all routes 
export const protect = async (req: any, res: Response, next: NextFunction): Promise<void> => {

    // Get token in the header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    // Verify token
    try {
        const decoded: any = jwt_decode(token);

        const user = await User.findOne({ firebaseId: decoded.user_id });

        if (!user) {
            res.status(401).json({ msg: 'No user found' });
            return;
        }

        if (req.route.path.includes('admin') && user.role !== 'admin' ) {
            res.status(401).json({ msg: 'User does not have admin access' });
        }

        console.log(req.route.path)

        req.user = user;
        req.user.userId = user._id;

        next();
    } catch (err) {
        console.log(err)
        res.status(401).json(err);
    }
};

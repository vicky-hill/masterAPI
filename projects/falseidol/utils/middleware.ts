import { Response, NextFunction } from 'express'
import jwt_decode from 'jwt-decode'
import User from '../users/users.model'


// Protect all routes 
export const protect = async (req: any, res: Response, next: NextFunction) => {
    // Get token in the header
    const token = req.header('x-auth-token');

    // Verify token
    try {
        const decoded: any = jwt_decode(token);

        const user = await User.findByPk(decoded.user_id);

        if (!user) {
            return res.status(401).json({ msg: 'No user found' });
        }

        if (req.route.path !== '/current' && !user.verified) {
            return res.status(401).json({ msg: 'User is not verified' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user?.isAdmin) {
            res.status(401).json({ msg: 'Admin access required' });
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Admin access required' });
    }
}
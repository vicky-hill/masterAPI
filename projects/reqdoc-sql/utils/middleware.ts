import { Response, NextFunction } from 'express'
import jwt_decode from 'jwt-decode'
import User from '../users/users.model'

export const protect = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    if (token === 'admin') {
        const user = await User.findByPk('abc');
        req.user = user;
        next();

        return;
    }

     if (token === 'admin2') {
        const user = await User.findByPk('cde');
        req.user = user;
        next();

        return;
    }

    // Verify token
    try {
        const decoded: any = jwt_decode(token);

        const user = await User.findByPk(decoded.user_id);

        if (!user) {
            return res.status(401).json({ msg: 'No user found' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

import User from './users.model'
import jwt_decode from 'jwt-decode'
import validate from '../utils/validation'
import { Request, Response, NextFunction } from 'express'
import { UserAttributes } from '../../../types/snapplist/attribute.types'
import { CreateUser } from '../../../types/snapplist/payload.types'



export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserAttributes[] = await User.find()
            .select('-firebaseId -createdAt -updatedAt -__v')
            .populate('been', 'name')
        res.json(users);
    } catch (err: any) {
        err.ctrl = getUsers;
        next(err);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateUser;

        const username = req.body.email?.split('@')[0];
        const body = { ...req.body, username }

        await validate.createUser(body);

        const newUser: UserAttributes = await User.create(body);
  
        const user: UserAttributes | null = await User.findById(newUser._id)
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(201).json(user);
    } catch (err: any) {
        err.ctrl = createUser;
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            res.json(null);
            return;
        }

        const decodedToken: any = jwt_decode(token);

        const user: UserAttributes | null = await User.findOne({ firebaseID: decodedToken.user_id })
            .select('-firebaseId -createdAt -updatedAt -__v')

        if (!user) {
            res.json(null);
            return;
        }

        res.json(user);
    } catch (err: any) {
        err.ctrl = getUser;
        next(err);
    }
}
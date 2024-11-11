import User from '../../reqdoc/users/users.model'
import { Request, Response, NextFunction } from 'express'
import { UserAttributes } from '../../../types/reqdoc/attributes.types'  
import { CreateUser, UpdateUser } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserAttributes[] = await User.find();
        res.json(users);
    } catch (err: any) {
        err.ctrl = getUsers;
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user: UserAttributes | null = await User.findById(userId);
        if (!user) return throwError('User not found');
        
        res.json(user);
    } catch (err: any) {
        err.ctrl = getUser;
        next(err);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateUser;

        const user: UserAttributes | null = await User.create(req.body);
        
        res.json(user);    
    } catch (err: any) {
        err.ctrl = createUser;
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateUser;

        const { userId } = req.params;

        const updatedUser: UserAttributes | null = await User.findByIdAndUpdate(
            userId, req.body, { new: true }
        );
    
        res.json(updatedUser);    
    } catch (err: any) {
        err.ctrl = updateUser;
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        
        res.json(user);    
    } catch (err: any) {
        err.ctrl = deleteUser;
        next(err);
    }
}
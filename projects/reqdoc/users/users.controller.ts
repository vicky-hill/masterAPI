import { Request, Response, NextFunction } from 'express'
import * as User from './users.functions'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (err: any) {
        next(err);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.createUser(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        next(err);
    }
}

export const inviteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const user = await User.inviteUser(req.body, userId);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const updatedUser = await User.updateUser(req.body, userId);
        res.status(200).json(updatedUser);
    } catch (err: any) {
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');
        
        const user = await User.getUser(token);
        res.json(user);
    } catch (err: any) {
        next(err);
    }
}
import { Request, Response, NextFunction } from 'express'
import * as User from './users.functions'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await User.getUser(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const user = await User.getUser(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const user = await User.loginUser(userId, req);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await User.updateUser(req.body, userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await User.deleteUser(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

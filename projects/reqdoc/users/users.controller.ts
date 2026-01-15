import { NextFunction, Request, Response } from 'express'
import * as User from './users.functions'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.getUsers();
        res.json(users)
    } catch (err) {
        next(err)
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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const { userId } = req.params;

    const user = await User.createUser(req.body, userId);
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const inviteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {   
    const { userId } = req.user;

    const result = await User.inviteUser(req.body, userId);
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { userId: loggedInUserId } = req.user;
    
    const user = await User.updateUser(req.body, userId, loggedInUserId);
    res.json(user)
  } catch (err) {
    next(err)
  }
}
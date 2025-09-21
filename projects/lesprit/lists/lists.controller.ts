import { Request, Response, NextFunction } from 'express'
import * as List from './lists.functions'

export const createList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const list = await List.createList(req.body, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const lists = await List.getLists(userId);
        res.json(lists);
    } catch (err) {
        next(err);
    }
}

export const getPublicLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lists = await List.getPublicLists();
        res.json(lists)
    } catch (err) {
        next(err);
    }
}

export const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list = await List.getList(listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const updateList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list = await List.updateList(req.body, listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const addListToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { listId } = req.params;

        const list = await List.addListToUser(listId, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const removeListFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { listId } = req.params;

        const list = await List.removeListFromUser(listId, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list = await List.deleteList(listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const deleteUserLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const deleted = await List.deleteUserLists(userId);
        res.json({ deleted });
    } catch (err) {
        next(err);
    }
}

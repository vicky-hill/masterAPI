import { Request, Response, NextFunction } from 'express'
import * as List from './lists.functions'
import { ListAttributes } from '../../../types/lesprit/attribute.types'

export const createList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const list: ListAttributes = await List.createList(req.body, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        
        const lists: ListAttributes[] = await List.getLists(userId);
        res.json(lists);
    } catch (err) {
        next(err);
    }
}

export const getPublicLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lists: ListAttributes[] = await List.getPublicLists();
        res.json(lists)
    } catch (err) {
      next(err);
    }
}

export const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list: ListAttributes = await List.getList(listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const updateList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list: ListAttributes = await List.updateList(req.body, listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const addListToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { listId } = req.params;

        const list: ListAttributes = await List.addListToUser(listId, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const removeListFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { listId } = req.params;

        const list: ListAttributes = await List.removeListFromUser(listId, userId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list: ListAttributes = await List.deleteList(listId);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const deleteUserLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const deleted: number = await List.deleteUserLists(userId);
        res.json({ deleted });
    } catch (err) {
        next(err);
    }
}

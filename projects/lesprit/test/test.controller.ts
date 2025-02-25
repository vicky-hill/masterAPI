import { Request, Response, NextFunction } from 'express'
import * as List from './test.functions'


export const createList = async (req: Request, res: Response, next: NextFunction) => {
	try {
        const list = await List.createList(req.body);
		res.json(list);
	} catch (err) {
		next(err);
	}
}

export const getLists = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const lists = await List.getLists();
		res.json(lists);
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

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { listId } = req.params;

		const list = await List.deleteList(listId);
		res.json(list);
	} catch (err) {
		next(err);
	}
}
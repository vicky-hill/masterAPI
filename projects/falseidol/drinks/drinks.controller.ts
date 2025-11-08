import { Request, Response, NextFunction } from 'express'
import * as Drink from './drinks.functions'

export const getDrinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, current } = req.query;

        const drinks = await Drink.getDrinks(type as string, current as string);
        res.json(drinks);
    } catch (err) {
        next(err);
    }
}


export const syncDrinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const drinks = await Drink.syncDrinks();
        res.json(drinks);
    } catch (err) {
        next(err);
    }
}

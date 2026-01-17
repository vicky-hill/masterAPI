import { Request, Response, NextFunction } from 'express'
import * as Drink from './drinks.functions'

export const getDrinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, current } = req.query;
        const { userId } = req.user;

        const drinks = await Drink.getDrinks(type as string, current as string, userId);
        res.json(drinks);
    } catch (err) {
        next(err);
    }
}


export const updateDrink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { drinkId } = req.params;

        const drink = await Drink.updateDrink(Number(drinkId as string), req.body);
        res.json(drink);
    } catch (err) {
        next(err);
    }
}

export const createDrink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const drink = await Drink.createDrink(req.body);
        res.json(drink);
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

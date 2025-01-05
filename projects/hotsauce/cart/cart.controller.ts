import { Request, Response, NextFunction } from 'express'
import * as Cart from './cart.functions'

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const cart = await Cart.addToCart(req.body, userId);
        res.json(cart);
    } catch (err) {
        next(err);
    }
}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const cart = await Cart.getCart(userId);
        res.json(cart);
    } catch (err) {
        next(err);
    }
}
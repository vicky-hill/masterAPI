import { Request, Response, NextFunction } from 'express'
import * as Cart from './carts.functions'
import CartModel from './carts.model'


export const retrieveCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { cartId } = req.params;

        const cart = await Cart.getCart(userId, cartId as string);
        res.json(cart);
    } catch (err) {
        next(err);
    }
}

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const cart = await Cart.addItem(req.body, userId as string);
        res.json(cart);
    } catch (err) {
        next(err);
    }
}

export const convertCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId } = req.params;
        const { userId } = req.user;

        const cart = await Cart.convertCart(userId as string, cartId as string);
        res.json(cart);
    } catch (err) {
        next(err);
    }
}

export const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = await Cart.getAllCarts();
        res.json(carts);
    } catch (err) {
        next(err);
    }
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        const carts = await Cart.updateQuantity(cartItemId as string, quantity);
        res.json(carts);
    } catch (err) {
        next(err);
    }
}

export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartItemId } = req.params;

        const carts = await Cart.removeItem(cartItemId as string);
        res.json(carts);
    } catch (err) {
        next(err);
    }
}

export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CartModel.deleteMany({});
        res.send('All carts deleted');
    } catch (err) {
        next(err);
    }
}
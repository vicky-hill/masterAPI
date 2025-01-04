import {Request, Response, NextFunction} from 'express'
import * as Product from './products.functions'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.getProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await Product.getProduct(productId);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.createProduct(req.body);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await Product.updateProduct(req.body, productId);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        const product = await Product.deleteProduct(productId);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

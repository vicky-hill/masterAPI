import { Request, Response, NextFunction } from 'express'
import * as Category from './categories.functions'


export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.getCategories();
        res.json(categories);
    } catch (err) {
        next(err);
    }
}

export const getCategoryByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const categories = await Category.getCategoryById(categoryId as string);
        res.json(categories);
    } catch (err) {
        next(err);
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.createCategory(req.body);
        res.json(category);
    } catch (err) {
        next(err);
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.updateCategory(categoryId as string, req.body);
        res.json(category);
    } catch (err) {
        next(err);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.deleteCategory(categoryId as string);
        res.json(category);
    } catch (err) {
        next(err);
    }
}

export const sortCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.sortCategories(req.body);
        res.json(categories);
    } catch (err) {
        next(err);
    }
}


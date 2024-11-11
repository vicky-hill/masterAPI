import Category from './categories.model'
import { Request, Response, NextFunction } from 'express'
import { CategoryAttributes } from '../../../types/snapplist/attribute.types'
import { CreateCategory, UpdateCategory } from '../../../types/snapplist/payload.types'
import throwError from '../../../utils/throwError'

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories: CategoryAttributes[] = await Category.find();
        res.json(categories);
    } catch (err: any) {
        err.ctrl = getCategories;
        next(err);
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const category: CategoryAttributes | null = await Category.findById(categoryId);
        if (!category) return throwError('Category not found');

        res.json(category);
    } catch (err: any) {
        err.ctrl = getCategoryById;
        next(err);
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateCategory;

        const category: CategoryAttributes | null = await Category.create(req.body);

        res.json(category);
    } catch (err: any) {
        err.ctrl = createCategory;
        next(err);
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateCategory;

        const { categoryId } = req.params;

        const updatedCategory: CategoryAttributes | null = await Category.findByIdAndUpdate(
            categoryId, req.body, { new: true }
        );

        res.json(updatedCategory);
    } catch (err: any) {
        err.ctrl = updateCategory;
        next(err);
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndDelete(categoryId);

        res.json(category);
    } catch (err: any) {
        err.ctrl = deleteCategory;
        next(err);
    }
}


export const deleteAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Category.deleteMany({});
        res.json('deleted');
    } catch (err: any) {
        err.ctrl = deleteCategory;
        next(err);
    }
}


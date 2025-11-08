import { Language } from '../../../types/fluent/attribute.types'
import { Request, Response, NextFunction } from 'express'
import * as Lesson from './lessions.functions'

export const getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { language, section } = req.query;

        const lessons = await Lesson.getLessons(language as Language, Number(section));
        res.json(lessons);
    } catch (err) {
        next(err);
    }
}


export const createLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessons = await Lesson.createLessons(req.body);
        res.json(lessons);
    } catch (err) {
        next(err);
    }
}
import { Request, Response, NextFunction } from 'express'
import * as Lesson from './lessions.functions'

export const getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessons = await Lesson.getLessons();
        res.json(lessons);
    } catch (err) {
        next(err);
    }
}

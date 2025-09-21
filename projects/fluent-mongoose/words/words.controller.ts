import { Request, Response, NextFunction } from 'express'
import * as Word from './words.functions'

export const getWordsByLanguage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { language } = req.params;

         const words = await Word.getWords(language);
        res.json(words);
    } catch (err) {
        next(err);
    }
}

export const createWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const word = await Word.createWord(req.body);
        res.json(word);    
    } catch (err) {
        next(err);
    }
}
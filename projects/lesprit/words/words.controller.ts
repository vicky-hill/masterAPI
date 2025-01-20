import { Request, Response, NextFunction } from 'express'
import * as Word from './words.functions'

export const createWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const word = await Word.createWord(req.body, userId);
        res.json(word);
    } catch (err) {
        next(err);
    }
}

export const getWords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { list } = req.query;

        const words = await Word.getWords(userId, list);
        res.json(words);
    } catch (err) {
        next(err);
    }
}

export const getWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { wordId } = req.params;

        const word = await Word.getWord(wordId);
        res.json(word);
    } catch (err) {
        next(err);
    }
}

export const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const review = await Word.getReview(userId);
        res.json(review);
    } catch (err) {
        next(err);
    }
}

export const updateWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { wordId } = req.params;

        const word = await Word.updateWord(req.body, wordId);
        res.json(word);
    } catch (err) {
        next(err);
    }
}

export const deleteWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { wordId } = req.params;

        const word = await Word.deleteWord(wordId);
        res.json(word);
    } catch (err) {
        next(err);
    }
}

export const importWords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const words = await Word.importWords(userId);
        res.json(words);       
    } catch (err) {
      console.log(err);
    }
}
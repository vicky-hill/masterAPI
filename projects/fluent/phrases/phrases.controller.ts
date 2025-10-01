import { Request, Response, NextFunction } from 'express'
import * as Phrase from './phrases.functions'

export const getPhrases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phrases = await Phrase.getPhrases();
        res.json(phrases);
    } catch (err) {
        next(err);
    }
}

export const getPhrase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phraseId } = req.params;
       
        const phrase = await Phrase.getPhrase(phraseId);
        res.json(phrase);
    } catch (err) {
        next(err);
    }
}

export const createPhrase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phrase = await Phrase.createPhrase(req.body);
        res.json(phrase);
    } catch (err) {
        next(err);
    }
}

export const updatePhrase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phraseId } = req.params;

        const phrase = await Phrase.updatePhrase(req.body, phraseId);
        res.json(phrase);
    } catch (err) {
        next(err);
    }
}

export const deletePhrase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phraseId } = req.params;
        
        const phrase = await Phrase.deletePhrase(phraseId);
        res.json(phrase);
    } catch (err) {
        next(err);
    }
}

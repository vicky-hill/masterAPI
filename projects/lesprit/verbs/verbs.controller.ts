import { Request, Response, NextFunction } from 'express'
import * as Verb from './verbs.functions'

export const getAdminVerbs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verbs = await Verb.getAdminVerbs();
        res.json(verbs);
    } catch (err) {
        next(err);
    }
}

export const getVerb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verbId } = req.params;

        const verb = await Verb.getVerb(verbId as string);
        res.json(verb);
    } catch (err) {
        next(err);
    }
}

export const createVerb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verb = await Verb.createVerb(req.body);
        res.json(verb);    
    } catch (err) {
        next(err);
    }
}

export const updateVerb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verbId } = req.params;

        const verb = await Verb.updateVerb(req.body, verbId as string);
        res.json(verb);    
    } catch (err) {
        next(err);
    }
}

export const deleteVerb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verbId } = req.params;

        const verb = await Verb.deleteVerb(verbId as string);
        res.json(verb);    
    } catch (err) {
        next(err);
    }
}

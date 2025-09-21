import { Request, Response, NextFunction } from 'express'
import * as Word from './words.functions'

export const getAllWords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const language = req.query.language as string;

    const words = await Word.getAllWords(language);
    res.json(words)
  } catch (err) {
    next(err)
  }
}

export const createAdjectives = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const words = await Word.createAdjectives(req.body);
    res.json(words)
  } catch (err) {
    next(err)
  }
}
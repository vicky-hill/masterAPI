import { Request, Response, NextFunction } from 'express'
import * as Group from './groups.functions'

export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const language = req.query.language as string;

    const groups = await Group.getAllGroups(language);
    res.json(groups)
  } catch (err) {
    next(err)
  }
}

export const getNeatGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const language = req.query.language as string;

    const groups = await Group.getNeatGroups(language);
    res.json(groups)
  } catch (err) {
    next(err)
  }
}
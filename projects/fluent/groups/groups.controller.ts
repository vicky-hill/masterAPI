import { Request, Response, NextFunction } from 'express'
import * as Group from './groups.functions'

export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { language } = req.query;

    const groups = await Group.getAllGroups(language as string);
    res.json(groups)
  } catch (err) {
    next(err)
  }
}

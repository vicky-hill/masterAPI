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

// export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { language } = req.query;
// 
//     const groups = await Group.getAllGroups(language as string);
//     res.json(groups)
//   } catch (err) {
//     next(err)
//   }
// }

// recognizes controller / functions in file name
// options q: add req.query, p: add req.params



import { Request, Response, NextFunction } from 'express'
import * as Post from './posts.functions'

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.getPosts();
    res.json(posts)
  } catch (err) {
    next(err)
  }
}

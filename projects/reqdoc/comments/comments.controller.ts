import { Request, Response, NextFunction } from 'express'
import * as Comment from './comments.functions'

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Comment.addComment(req.body, reqId, userId);
        res.json(requirement)
    } catch (err) {
        next(err)
    }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.user;

        const result = await Comment.editComment(req.body, commentId, userId);
        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;
        const { userId } = req.user;

        const comment = await Comment.deleteComment(commentId, userId);
        res.json(comment)
    } catch (err) {
        next(err)
    }
}
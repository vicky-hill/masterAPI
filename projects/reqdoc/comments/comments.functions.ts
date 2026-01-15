import { Comment, Req } from '../models'
import validate from '../utils/validation'

export const addComment = async (data: { text: string }, reqId: string, userId: string) => {
    await validate.addComment(data);

    await Req.checkAccess(reqId, userId);

    await Comment.create(
        { ...data, userId, reqId: Number(reqId) },
        { fields: ['text', 'reqId', 'userId'] }
    )

    const req = await Req.getReqById(reqId);
    return req;
}

export const editComment = async (data: { text: string }, commentId: string, userId: string) => {
    await validate.editComment(data);

    const comment = await Comment.findByPk(commentId, {
        rejectOnEmpty: new Error('Comment not found')
    })

    await comment.checkAccess(userId);
    await comment.update(
        { ...data, edited: true },
        { fields: ['text', 'edited'] }
    )

    const req = await Req.getReqById(comment.reqId);
    return req;
}

export const deleteComment = async (commentId: string, userId: string) => {
    const comment = await Comment.findByPk(commentId, {
        rejectOnEmpty: new Error('Comment not found')
    })

    await comment.checkAccess(userId);
    await comment.destroy();

    const req = await Req.getReqById(comment.reqId);
    return req;
}
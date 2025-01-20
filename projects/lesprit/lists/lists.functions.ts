import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError'
import List from './lists.model'
import Word from '../words/words.model'
import User from '../users/users.model'
import { ListAttributes } from '../../../types/lesprit/attribute.types'


export const createList = async (data: CreateList, userId: string): Promise<ListAttributes> => {
    const list = await List.create({ ...data, user: userId });
    await User.findByIdAndUpdate(userId, { $push: { lists: list._id } }, { new: true });

    return list;
}

export const getLists = async (userId: string): Promise<ListAttributes[]> => {
    const user = await User.findById(userId).populate({
        path: 'lists',
        options: { sort: { createdAt: -1 } }
    });

    if (!user) return throwError('User not found');

    return user.lists;
}

export const getPublicLists = async (): Promise<ListAttributes[]> => {
    const lists = await List.find({ public: true });
    return lists;
}

export const getList = async (listId: string): Promise<ListAttributes> => {
    const list = await List.findById(listId);

    if (!list) return throwError('List not found');

    return list;
}

export const updateList = async (data: UpdateList, listId: string): Promise<ListAttributes> => {
    const list = await List.findByIdAndUpdate(listId, data, { new: true });

    if (!list) return throwError('List not found');

    return list;
}

export const addListToUser = async (listId: string, userId: string): Promise<ListAttributes> => {
    const list = await List.findById(listId);

    if (!list) return throwError('List not found');

    const listWords = await Word.find({ list: listId, user: list.user })
    
    await Word.create(listWords.map(({ foreign, native, list }) => ({
        foreign,
        native,
        list,
        user: userId,
        rating: 0,
        dueDate: new Date()
    })))

    await User.findByIdAndUpdate(userId, { $addToSet: { lists: listId } }, { new: true });

    return list;
}

export const removeListFromUser = async (listId: string, userId: string): Promise<ListAttributes> => {
    const list = await List.findById(listId);

    if (!list) return throwError('List not found');

    await User.findByIdAndUpdate(userId, { $pull: { lists: listId } }, { new: true });

    return list;
}

export const deleteList = async (listId: string): Promise<ListAttributes> => {
    const list = await List.findByIdAndUpdate(listId, { deleted: new Date() }, { new: true });
    if (!list) return throwError('List not found');

    await Word.deleteMany({ list: listId });

    return list;
}

export const deleteUserLists = async (userId: string): Promise<number> => {
    const words = await Word.deleteMany({ user: userId });
    const lists = await List.deleteMany({ user: userId });

    return lists.deletedCount;
}
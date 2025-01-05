import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError'
import List from './lists.model'
import Word from '../words/words.model'
import { ListAttributes } from '../../../types/lesprit/attribute.types'


export const createList = async (data: CreateList, userId: string): Promise<ListAttributes> => {
    const list = await List.create({ ...data, user: userId });

    return list;
}

export const getLists = async (userId: string): Promise<ListAttributes[]> => {
    const lists = await List.find({ user: userId }).sort({ createdAt: -1 });

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

export const deleteList = async (listId: string): Promise<ListAttributes> => {
    const list = await List.findByIdAndDelete(listId);

    if (!list) return throwError('List not found');

    return list;
}

export const deleteUserLists = async (userId: string): Promise<number> => {
    const words = await Word.deleteMany({ user: userId });
    const lists = await List.deleteMany({ user: userId });

    return lists.deletedCount;
}
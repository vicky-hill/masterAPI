import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError'
import List from './lists.model'
import Word from '../words/words.model'


export const createList = async (data: CreateList, userId: string) => {
    const list = await List.create({ ...data, user: userId });

    return list;
}

export const getLists = async (userId: string) => {
    const lists = await List.find({ user: userId }).sort({ createdAt: -1 });

    return lists;
}

export const getList = async (listId: string) => {
    const list = await List.findById(listId);

    if (!list) throwError('List not found');

    return list;
}

export const updateList = async (data: UpdateList, listId: string) => {
    const list = await List.findByIdAndUpdate(listId, data, { new: true });

    if (!list) throwError('List not found');

    return list;
}

export const deleteList = async (listId: string) => {
    const list = await List.findByIdAndDelete(listId);

    if (!list) throwError('List not found');

    return list;
}

export const deleteUserLists = async (userId: string) => {
    const words = await Word.deleteMany({ user: userId });
    const lists = await List.deleteMany({ user: userId });

    return lists.deletedCount;
}
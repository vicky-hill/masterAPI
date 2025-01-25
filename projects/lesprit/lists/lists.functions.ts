import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError'
import List from './lists.model'
import Word from '../words/words.model'
import User from '../users/users.model'
import { ListAttributes } from '../../../types/lesprit/attribute.types'
import { ListObject } from '../../../types/lesprit/objects.types'
import getImageUrl from '../utils/getImageUrl'


export const createList = async (data: CreateList, userId: string): Promise<ListAttributes> => {
    const list = await List.create({ ...data, user: userId });
    await User.findByIdAndUpdate(userId, { $push: { lists: list._id } }, { new: true });

    return list;
}


export const getLists = async (userId: string): Promise<ListObject[]> => {
    const userInstance = await User.findById(userId).populate({
        path: 'lists',
        options: { sort: { createdAt: -1 } }
    });

    if (!userInstance) return throwError('User not found');

    const user = userInstance.toObject();

    const lists = user.lists.map((list: ListObject) => ({
        ...list,
        image: getImageUrl(list.image)
    }))

    return lists;
}


export const getPublicLists = async (): Promise<any> => {
    const lists = await List.find({ public: true }).lean();

    return lists.map(list => ({
        ...list,
        image: getImageUrl(list.image)
    }))
}


export const getList = async (listId: string): Promise<any> => {
    const list: any = await List.findById(listId).lean();

    if (!list) return throwError('List not found');

    list.image = getImageUrl(list.image);

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
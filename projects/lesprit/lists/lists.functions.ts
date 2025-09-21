import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import throwError from '../../../utils/throwError'
import ListModel from './lists.model'
import Word from '../words/words.model'
import User from '../users/users.model'
import { ListAttributes } from '../../../types/lesprit/attribute.types'
import { List } from '../../../types/lesprit/objects.types'
import getImageUrl from '../utils/getImageUrl'


export const createList = async (data: CreateList, userId: string) => {
    const list = await ListModel.create({ ...data, user: userId });
    await User.findByIdAndUpdate(userId, { $push: { lists: list._id } }, { new: true });

    return list as ListAttributes;
}


export const getLists = async (userId: string) => {
    const userInstance = await User.findById(userId).populate({
        path: 'lists',
        options: { sort: { createdAt: -1 } }
    });

    if (!userInstance) return throwError('User not found');

    const user = userInstance.toObject();

    const lists = user.lists.map((list: List) => ({
        ...list,
        image: getImageUrl(list.image)
    }))

    return lists as List[];
}


export const getPublicLists = async (): Promise<any> => {
    const lists = await ListModel.find({ public: true }).lean();

    return lists.map(list => ({
        ...list,
        image: getImageUrl(list.image)
    }))
}


export const getList = async (listId: string) => {
    const list: any = await ListModel.findById(listId).lean();

    if (!list) return throwError('List not found');

    list.image = getImageUrl(list.image);

    return list as List;
}


export const updateList = async (data: UpdateList, listId: string) => {
    const list = await ListModel.findByIdAndUpdate(listId, data, { new: true });

    if (!list) return throwError('List not found');

    return list as ListAttributes;
}


export const addListToUser = async (listId: string, userId: string) => {
    const list = await ListModel.findById(listId);

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

    return list as ListAttributes;
}

export const removeListFromUser = async (listId: string, userId: string) => {
    const list = await ListModel.findById(listId);

    if (!list) return throwError('List not found');

    await User.findByIdAndUpdate(userId, { $pull: { lists: listId } }, { new: true });

    return list as ListAttributes;
}


export const deleteList = async (listId: string) => {
    const list = await ListModel.findByIdAndUpdate(listId, { deleted: new Date() }, { new: true });
    if (!list) return throwError('List not found');

    await Word.deleteMany({ list: listId });

    return list as ListAttributes;
}


export const deleteUserLists = async (userId: string): Promise<number> => {
    const words = await Word.deleteMany({ user: userId });
    const lists = await ListModel.deleteMany({ user: userId });

    return lists.deletedCount as number;
}
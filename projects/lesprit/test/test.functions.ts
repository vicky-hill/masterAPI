import { List, ListAttributes, ListDocument } from '../../../types/lesprit/attribute.types'
import { CreateList, UpdateList } from '../../../types/lesprit/payload.types'
import ListModel from './test.model'


export const createList = async (data: CreateList) => {
    const listInstance: ListAttributes = await ListModel.create({ ...data });
    const list = listInstance.toObject();

    return list as List;
}

export const getLists = async () => {
    const listInstances: ListDocument[] = await ListModel.find().lean();

    const lists = listInstances.map(listInstance => ({
        ...listInstance
    }))

    return lists as List[];
}

export const getList = async (listId: string): Promise<any> => {
    const list: ListDocument = await ListModel.findById(listId).lean();

    if (!list) throw new Error('List not found');

    return list as List;
}

export const updateList = async (data: UpdateList, listId: string) => {
    const list: ListDocument = await ListModel.findByIdAndUpdate(listId, data, { new: true }).lean();

    if (!list) throw new Error('List not found');

    return list as List;
}

export const deleteList = async (listId: string) => {
    const list: ListDocument = await ListModel.findByIdAndDelete(listId).lean();

    if (!list) throw new Error('List not found');

    return list as List;
}

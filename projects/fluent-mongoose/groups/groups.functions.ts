import { Group, GroupAttributes } from '../../../types/fluent-mongoose/attribute.types'
import { CreateGroup, UpdateGroup } from '../../../types/fluent-mongoose/payload.types'
import GroupModel from './groups.model'

export const getGroups = async (language: string) => {
    const groupInstances = await GroupModel.find().populate('words').lean();

    const groups = groupInstances.map(groupInstance => ({
        ...groupInstance,
        words: language ? groupInstance.words.map((word: any) => ({
            _id: word._id,
            english: word.english,
            target: word[language],
            image: word.image
        })) : groupInstance.words
    }))

    return groups as Group[];
}

export const getGroup = async (groupId: string): Promise<any> => {
    const group = await GroupModel.findById(groupId).lean();

    if (!group) throw new Error('Group not found');

    return group as Group;
}

export const createGroup = async (data: CreateGroup) => {
    const groupInstance: GroupAttributes = await GroupModel.create({ ...data });
    const group = groupInstance.toObject();

    return group as Group;
}

export const updateGroup = async (data: UpdateGroup, groupId: string) => {
    const group = await GroupModel.findByIdAndUpdate(groupId, data, { new: true }).lean();

    if (!group) throw new Error('Group not found');

    return group as Group;
}

export const deleteGroup = async (groupId: string) => {
    const group = await GroupModel.findByIdAndDelete(groupId).lean();

    if (!group) throw new Error('Group not found');

    return group as Group;
}
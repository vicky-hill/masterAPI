import { CreateUser } from '../../../types/hotsauce/payload.types'
import User from './users.model'
import throwError from '../../../utils/throwError'

export const createUser = async (data: CreateUser) => {
    const newUser = await User.create(data);
    const user = await User.findById(newUser._id);

    return user;
}

export const getUser = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) return throwError('User not found');

    return user;
}
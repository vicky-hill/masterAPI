import { User } from '../utils/models'
import jwt_decode from 'jwt-decode'
import { Request } from 'express'


export const getUsers = async () => {
    const userInstances = await User.findAll({
        where: {}
    });

    const users = userInstances.map((userInstance) => {
        const user = userInstance.get({ plain: true });
        return { ...user };
    })

    return users;
}

export const getUser = async (userId: string) => {
    const user = await User.findOne({
        rejectOnEmpty: new Error('User not found'),
        where: { userId }
    });

    return user;
}

export const createUser = async (data: User) => {
    const user = await User.create(data);
    return user;
}

export const updateUser = async (data: User, userId: string) => {
    const user = await User.findOne({
        rejectOnEmpty: new Error('User not found'),
        where: { userId }
    });

    await user.update(data);

    return user;
}

export const deleteUser = async (userId: string) => {
    await User.destroy({ where: { userId } });
    return { userId };
}
import { User } from '../../../types/falseidol/attribute.types'
import UserModel from './users.model'

export const getUsers = async () => {
    const userInstances = await UserModel.findAll({
        where: {} 
    });

    const users = userInstances.map((userInstance) => {
        const user = userInstance.get({ plain: true });
        return { ...user };
    })

    return users;
}

export const getUser = async (userId: string): Promise<any> => {
    const userInstance = await UserModel.findOne({
        where: { userId }
    });

    if (!userInstance) throw new Error('User not found');

    const user = userInstance.get({ plain: true });

    return user;
}

export const createUser = async (data: User) => {
    const user = await UserModel.create(data);

    return user;
}

export const updateUser = async (data: User, userId: string) => {
    const user = await UserModel.update(data,
        { where: { userId } }
    );

    if (!user) throw new Error('User not found');

    return user;
}

export const deleteUser = async (userId: string) => {
    await UserModel.destroy({ where: { userId }});
    return { userId };
}
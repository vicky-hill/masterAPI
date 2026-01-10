import { TeamModel, UserModel } from '../models'

export const getUser = async (userId: string): Promise<any> => {
    const user = await UserModel.findByPk(userId, {
        rejectOnEmpty: new Error('User not found'),
        include: [
            {
                model: TeamModel,
                through: { attributes: [] }
            },
            TeamModel
        ]
    });

    return user;
}
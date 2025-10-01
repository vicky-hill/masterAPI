import { TeamModel, UserModel } from '../associations'

export const getUser = async (userId: string): Promise<any> => {
    const userInstance = await UserModel.findOne({
        where: { userId },
        include: [{
            model: TeamModel,
            as: 'teams'
        }, {
            model: TeamModel,
            as: 'team'
        }]
    });

    if (!userInstance) throw new Error('User not found');

    const user = userInstance.get({ plain: true });

    return {
        ...user,
        teams: user.teams?.map(team => ({
            teamId: team.teamId,
            name: team.name
        })),
        team: {
            teamId: user.team?.teamId,
            name: user.team?.name
        }
    };
}
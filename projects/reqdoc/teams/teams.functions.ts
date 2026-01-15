import { Project, UserModel } from '../models'
import Team from './teams.model'

export const getTeams = async () => {
    const teams = await Team.findAll({
        include: [Project]
    });

    return teams;
}

export const addUserToCurrentTeam = async (teamId: string, userId: string) => {
    const team = await Team.getTeamById(teamId);

    const user = await UserModel.findByPk(userId, {
        rejectOnEmpty: new Error('User not found'),
    });

    if (team.users) {
        const userIds = team.users.map(user => user.userId);

        if (userIds.includes(userId)) {
            throw new Error('User is already part of this team');
        }
    }

    await team.addUser(user);
    await team.clearCache();

    const updatedTeam = await Team.getTeamById(teamId);
    return updatedTeam;
}

export const removeUserFromCurrentTeam = async (teamId: string, userId: string) => {
    const team = await Team.getTeamById(teamId);

    const user = await UserModel.findByPk(userId, {
        rejectOnEmpty: new Error('User not found'),
    });

    if (team.users) {
        const userIds = team.users.map(user => user.userId);

        if (!userIds.includes(userId)) {
            throw new Error('User is not part of this team');
        }
    }

    await team.removeUser(user);
    await team.clearCache();

    const updatedTeam = await Team.getTeamById(teamId);
    return updatedTeam;
}

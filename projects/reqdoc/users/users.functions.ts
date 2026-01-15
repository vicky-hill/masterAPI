import { Team, UserModel } from '../models'
import validate from '../utils/validation';

export const getUsers = async () => {
    const users = await UserModel.findAll();
    return users;
}

export const getUser = async (userId: string) => {
    const user = await UserModel.getUserById(userId);
    return user;
}

export const createUser = async (data: { userId: string, email: string, teamId?: number, role?: 'admin' | 'user' }, userId: string) => {
    await validate.createUser(data);
    const { teamId, role } = data;

    let team;

    if (teamId) {
        team = await Team.getTeamById(teamId, userId)
    } else {
        team = await Team.create({
            name: 'New Team'
        })
    }

    const { userId: newUserId } = await UserModel.create({
        ...data,
        teamId: teamId ? teamId : null,
        role: !teamId ? 'admin' : role ? role : 'user'
    })

    const user = await UserModel.getUserById(newUserId);

    await team.addUser(user);

    return user;
}

export const inviteUser = async (data: { userId: string, teamId: number, email: string }, userId: string) => {
    const { teamId } = data;

    // Todo :: Handle inviting non-existing user
    // Todo :: Check if user already in team
    // Todo :: Send email to user

    const team = await Team.getTeamById(teamId, userId);
    const user = await UserModel.getUserById(data.userId);

    await team.addUser(user);
}

export const updateUser = async (data: { role: string }, userId: string, loggedInUserId: string) => {
     // Todo :: Check access to edit (own user, user in team and role admin)
    
    const user = await UserModel.getUserById(userId);

    // await user.update(data, { fields: ['role']})

    return user;
}
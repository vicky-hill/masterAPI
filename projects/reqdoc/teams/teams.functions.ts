import { CreateTeam, UpdateTeam } from '../../../types/reqdoc/payloads.types'
import Team from './teams.model'
import validate from '../utils/validation'
import { TeamAttributes } from '../../../types/reqdoc/attributes.types'
import throwError from '../../../utils/throwError'
import User from '../users/users.model'
import { UserAttribute } from 'aws-sdk/clients/workmail'

export const createTeam = async (data: CreateTeam) => {
    await validate.createTeam(data);

    const team: TeamAttributes = await Team.create({ name: data.name })
    const updatedTeam: TeamAttributes | null = await Team.findByIdAndUpdate(
        team._id,
        {
            $push: {
                users: {
                    user: data.user,
                    role: 'user'
                }
            }
        },
        { new: true }
    )

    return updatedTeam;
}


export const getTeams = async () => {
    const teams: TeamAttributes[] = await Team.find();

    return teams;
}


export const updateTeam = async (data: UpdateTeam, teamId: string) => {
    const team: TeamAttributes | null = await Team.findByIdAndUpdate(teamId, data, { new: true })
        .populate({
            path: 'users.user',
            select: 'email',
        })

    if (!team) return throwError('Team not found');

    return team;
}


export const getUserTeam = async (teamId: string) => {
    const team: TeamAttributes | null = await Team.findById(teamId)
        .populate({
            path: 'users.user',
            select: 'email',
        })

    if (!team) return throwError('Team not found');

    return team;
}


export const getUserTeams = async (userId: string) => {
    const teams: TeamAttributes[] = await Team.find({ 'users.user': userId }).populate({
        path: 'users.user',
        select: 'email',
    })

    return { data: teams }
}


export const switchUserTeam = async (teamId: string, userId: string) => {
    const team: TeamAttributes | null = await Team.findById(teamId).populate({
        path: 'users.user',
        select: 'email',
    })

    if (!team) return throwError('Team not found');

    const teamUser = team.users.find(user =>
        user.user._id.toString() === userId
    )

    if (!teamUser) return throwError('Team user not found');

    const user: UserAttribute | null = await User.findByIdAndUpdate(userId,
        { role: teamUser.role, team: team._id },
        { new: true }
    );

    return user;
}


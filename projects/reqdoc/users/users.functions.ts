import { InviteUser, UpdateUser } from '../../../types/reqdoc/payloads.types'
import User from './users.model'
import { UserAttributes, TeamAttributes } from '../../../types/reqdoc/attributes.types'
import Team from '../teams/teams.model'
import validate from '../utils/validation'
import jwt_decode from 'jwt-decode'


export const getUsers = async () => {
    const users: UserAttributes[] = await User.find()
        .select('-firebaseID -createdAt -updatedAt -__v')

    return users;
}


export const createUser = async (data: any) => {
    const name = data.email?.split('@')[0];
    const body = { ...data, name }

    await validate.createUser(body);

    const newUser: UserAttributes = await User.create(body);
    const newTeam: TeamAttributes = await Team.create({
        name: 'New Team',
        users: [{ user: newUser._id, role: 'admin' }]
    })

    await User.findByIdAndUpdate(
        newUser._id,
        { team: newTeam._id, role: 'admin' },
        { new: true }
    )

    const user: UserAttributes | null = await User.findById(newUser._id)
        .select('-firebaseID -createdAt -updatedAt -__v');

    return user;
}


export const inviteUser = async (data: InviteUser, userId: string) => {
    const { team } = data;

    if (userId) {
        await Team.findByIdAndUpdate(
            team,
            { $push: { users: { user: userId, role: 'user' } } },
            { new: true }
        )

        const user: UserAttributes | null = await User.findById(userId)
            .select('-firebaseID -createdAt -updatedAt -__v');

        return user;
    }

    return null;
}


export const updateUser = async (data: UpdateUser, userId: string) => {
    await validate.updateUser(data);

    const updatedUser: UserAttributes | null = await User.findByIdAndUpdate(userId, data, { new: true })
        .select('-firebaseID -createdAt -updatedAt -__v');

    return updatedUser;
}


export const getUser = async (token: string | undefined) => {
    if (!token) {
        return null;
    }

    const decodedToken: any = jwt_decode(token);

    const user: UserAttributes | null = await User.findOne({ firebaseID: decodedToken.user_id })
        .select('-firebaseID -createdAt -updatedAt -__v');

    if (!user) {
        return null;
    }

    return user;
}



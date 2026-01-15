import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, Project, User, UserModel } from '../models'
import { ADMIN } from '../utils/constants'
import { deleteValue, getValue, setValue } from '../../../utils/redis'



class Team extends Model<InferAttributes<Team, omit>, InferCreationAttributes<Team, omit>> {
    declare teamId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare name: string

    declare users?: NonAttribute<UserModel>[]
    declare projects?: NonAttribute<Project>[]

    declare addUser: HasManyAddAssociationMixin<UserModel, string>
    declare removeUser: HasManyRemoveAssociationMixin<UserModel, string>

    static async getTeamById(teamId: number | string, userId?: string) {
        const team = await this.findByPk(teamId, {
            rejectOnEmpty: new Error('Team not found'),
            include: [UserModel]
        });

        if (userId) {
            await team.checkAccess(userId);
        }

        return team;
    }

    static async checkAccess(teamId: number | string, userId: string) {
        if (userId === ADMIN) return;

        const team = await Team.findByPk(teamId, {
            include: [UserModel]
        })

        const hasAccess = team?.users?.map(user => user.userId).includes(userId);

        if (!hasAccess) throw new Error('User is not in the project team');
    }

    static async getTeamMembers(teamId: number) {
        const cached = await getValue('team:members:teamId', teamId);
        if (cached) return cached;

        const team = await this.findByPk(teamId, {
            rejectOnEmpty: new Error('No team found in getTeamMembers'),
            include: [UserModel]
        })

        const teamMembers = team.users?.map(user => user.userId);

        await setValue('team:members:teamId', team);

        return teamMembers;
    }

    static async clearCache(teamId: number) {
        await deleteValue('team:members:teamId', teamId)
    }

    async checkAccess(this: Team, userId: string) {
        await Team.checkAccess(this.teamId, userId);
    }

    async clearCache(this: Team) {
        await Team.clearCache(this.teamId);
    }
}

const teamSchema = {
    teamId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}

Team.init(teamSchema, {
    sequelize,
    modelName: "team",
    tableName: "teams",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})

export default Team;
import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, ProjectModel, UserModel } from '../models'


class TeamModel extends Model<InferAttributes<TeamModel, omit>, InferCreationAttributes<TeamModel, omit>> {
    declare teamId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare name: string

    declare users?: NonAttribute<UserModel>[]
    declare projects?: NonAttribute<ProjectModel>[]
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

TeamModel.init(teamSchema, {
    sequelize,
    modelName: "team",
    tableName: "teams",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    }
})

export default TeamModel;
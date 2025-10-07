import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { Project, User } from '../../../types/reqdoc/attribute.types'
import { ProjectModel, UserModel } from '../models'


class TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
    declare teamId: CreationOptional<number>
    declare name: string
    declare deleted: Date | null

    declare users?: User[]
    declare projects?: Project[]

    declare static associations: {
        users: Association<TeamModel, UserModel>
        resource: Association<TeamModel, ProjectModel>
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
    },
    deleted: {
        type: Sequelize.DATE
    }
}

TeamModel.init(teamSchema, {
    sequelize,
    modelName: "Team",
    tableName: "teams",
    timestamps: false
})

export default TeamModel;
import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { Feature, Team } from '../../../types/reqdoc/attribute.types'
import { FeatureModel, TeamModel } from '../models'


class ProjectModel extends Model<InferAttributes<ProjectModel>, InferCreationAttributes<ProjectModel>> {
    declare projectId: CreationOptional<number>
    declare teamId: number
    declare name: string
    declare projectKey: string
    declare key: string
    declare deleted?: Date | null

    declare team?: Team
    declare features?: Feature[]

    declare firstFeature?: Feature

    declare static associations: {
        team: Association<ProjectModel, TeamModel>
        features: Association<ProjectModel, FeatureModel>
    }
}

const projectSchema = {
    projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teamId: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    projectKey: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.STRING
    },
    deleted: {
        type: Sequelize.DATE
    }
}

ProjectModel.init(projectSchema, {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: false
})


export default ProjectModel;
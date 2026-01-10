import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { FeatureModel, omit, TeamModel } from '../models'

class ProjectModel extends Model<InferAttributes<ProjectModel, omit>, InferCreationAttributes<ProjectModel, omit>> {
    declare projectId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare teamId: number
    declare name: string
    declare projectKey: string
    declare key: string

    declare team?: NonAttribute<TeamModel>
    declare features?: NonAttribute<FeatureModel>[]
    declare firstFeature?: NonAttribute<number> | null
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
    firstFeature: {
        type: Sequelize.VIRTUAL,
        get(this: ProjectModel) {
            return this.features?.length && this.features[0].featureId
        }
    }
}

ProjectModel.init(projectSchema, {
    sequelize,
    modelName: "project",
    tableName: "projects",
    timestamps: false,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})


export default ProjectModel;
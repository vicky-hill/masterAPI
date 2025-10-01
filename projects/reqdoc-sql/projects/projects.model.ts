import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'


class ProjectModel extends Model<InferAttributes<ProjectModel>, InferCreationAttributes<ProjectModel>> {
    declare projectId: CreationOptional<number>
    declare teamId: number
    declare name: string
    declare slug: string
    declare key: string
    declare deleted: boolean
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
    slug: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.STRING
    },
    deleted: {
        type: Sequelize.BOOLEAN
    }
}

ProjectModel.init(projectSchema, {
  sequelize,
  modelName: "Project",
  tableName: "projects",
  timestamps: false
})


export default ProjectModel;
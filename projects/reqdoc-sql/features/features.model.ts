import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit, ProjectModel, ReqModel } from '../models'

class FeatureModel extends Model<InferAttributes<FeatureModel, omit>, InferCreationAttributes<FeatureModel, omit>> {
    declare featureId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    declare projectId: number
    declare parentId?: number
    declare name: string
    declare sort: number

    declare reqs?: NonAttribute<ReqModel>[]
    declare project?: NonAttribute<ProjectModel>
    declare subFeatures?: NonAttribute<FeatureModel>[]
    declare mainFeature?: NonAttribute<FeatureModel>
}

const featureSchema = {
    featureId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    parentId: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

FeatureModel.init(featureSchema, {
    sequelize,
    modelName: "feature",
    tableName: "features",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})


export default FeatureModel;
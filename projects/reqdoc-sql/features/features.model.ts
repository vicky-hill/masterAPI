import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { Feature } from '../../../types/reqdoc/attributes.types'

class FeatureModel extends Model<InferAttributes<FeatureModel>, InferCreationAttributes<FeatureModel>> {
    declare featureId: CreationOptional<number>
    declare projectId: number
    declare parentId: number | null
    declare name: string
    declare sort: number
    declare deleted: boolean

    declare subFeatures?: Feature[]

    declare static associations: {
        subFeatures: Association<FeatureModel, FeatureModel>
    }
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
    },
    deleted: {
        type: Sequelize.BOOLEAN
    }
}

FeatureModel.init(featureSchema, {
    sequelize,
    modelName: "Feature",
    tableName: "features",
    timestamps: false
})


export default FeatureModel;
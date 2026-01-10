import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'
import { omit } from '../models'

class ReqModel extends Model<InferAttributes<ReqModel, omit>, InferCreationAttributes<ReqModel, omit>> {
    declare reqId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date | null>
    // declare projectId: number
    declare featureId: number
    declare changedReq?: string | null
    declare latestReqId?: number
    declare key: string
    declare title?: string
    declare text: string
    declare details?: string
    declare status?: 'passed' | 'failed' | null
    declare sort: number

    declare history?: NonAttribute<ReqModel>[]
}

const reqSchema = {
    reqId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // projectId: {
    //     type: Sequelize.INTEGER
    // },
    featureId: {
        type: Sequelize.INTEGER
    },
    latestReqId: {
        type: Sequelize.INTEGER
    },
    changedReq: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    },
    details: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM({ values: ['passed', 'failed'] })
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

ReqModel.init(reqSchema, {
    sequelize,
    modelName: "req",
    tableName: "reqs",
    timestamps: true,
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
})


export default ReqModel;
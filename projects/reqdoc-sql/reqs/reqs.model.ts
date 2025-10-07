import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/reqdoc.db.config'

class ReqModel extends Model<InferAttributes<ReqModel>, InferCreationAttributes<ReqModel>> {
    declare reqId: CreationOptional<number>
    declare projectId: number
    declare featureId: number
    declare changedReq?: string | null
    declare latestReqId?: number
    declare key: string
    declare title: string
    declare text: string
    declare details?: string
    declare status?: 'passed' | 'failed' | null
    declare sort: number
    declare deleted: Date | null
    declare createdAt: string
    declare updatedAt: string
}

const reqSchema = {
    reqId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: Sequelize.INTEGER
    },
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
    },
    deleted: {
        type: Sequelize.DATE
    },
    createdAt: {
         type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}

ReqModel.init(reqSchema, {
    sequelize,
    modelName: "Req",
    tableName: "reqs",
    timestamps: false
})


export default ReqModel;
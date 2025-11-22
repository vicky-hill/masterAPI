import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'


class LogModel extends Model<InferAttributes<LogModel>, InferCreationAttributes<LogModel>> {
    declare logId: CreationOptional<number>
    declare request: string

}

const logSchema = {
    logId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request: {
        type: Sequelize.STRING,
        unique: true
    }
}

LogModel.init(logSchema, {
  sequelize,
  modelName: "Logs",
  tableName: "logs",
  timestamps: false
})

            

export default LogModel;
import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'


class Log extends Model<InferAttributes<Log>, InferCreationAttributes<Log>> {
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

Log.init(logSchema, {
  sequelize,
  modelName: "Logs",
  tableName: "logs",
  timestamps: false
})

            

export default Log;
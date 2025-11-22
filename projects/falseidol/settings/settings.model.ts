import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'


class SettingModel extends Model<InferAttributes<SettingModel>, InferCreationAttributes<SettingModel>> {
    declare settingId: CreationOptional<number>
    declare name: string
    declare active: boolean
}

const settingSchema = {
    settingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    }
}

SettingModel.init(settingSchema, {
  sequelize,
  modelName: "Settings",
  tableName: "settings",
  timestamps: false
})


export default SettingModel;
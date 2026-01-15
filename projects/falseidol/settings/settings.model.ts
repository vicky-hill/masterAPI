import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

class Setting extends Model<InferAttributes<Setting>, InferCreationAttributes<Setting>> {
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

Setting.init(settingSchema, {
  sequelize,
  modelName: "Settings",
  tableName: "settings",
  timestamps: false
})


export default Setting;
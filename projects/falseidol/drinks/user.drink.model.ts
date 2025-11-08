import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'


class UserDrinkModel extends Model<InferAttributes<UserDrinkModel>, InferCreationAttributes<UserDrinkModel>> {
    declare userDrinkId: CreationOptional<number>
    declare drinkId: number
    declare userId: number
    declare notes?: string
    declare ordered?: boolean
}

const userDrinkSchema = {
    userDrinkId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    drinkId: {
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER
    },
    notes: {
        type: Sequelize.STRING
    },
    ordered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}

UserDrinkModel.init(userDrinkSchema, {
  sequelize,
  modelName: "",
  tableName: "drinks",
  timestamps: false
})

    
export default UserDrinkModel;
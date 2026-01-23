import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

export interface UserInfo {
    userDrinkId: number
    drinkId: number
    userId: number
    notes: string
    ordered: number
}

class UserDrink extends Model<InferAttributes<UserDrink>, InferCreationAttributes<UserDrink>> {
    declare userDrinkId: CreationOptional<number>
    declare drinkId: number
    declare userId: string
    declare notes?: string
    declare ordered?: number
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
        type: Sequelize.STRING
    },
    notes: {
        type: Sequelize.STRING
    },
    ordered: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}

UserDrink.init(userDrinkSchema, {
  sequelize,
  modelName: "userDrink",
  tableName: "userDrinks",
  timestamps: false
})

    
export default UserDrink;
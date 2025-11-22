import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'
import { DrinkType, User } from '../../../types/falseidol/attribute.types'
import UserModel from '../users/users.model'
import UserDrinkModel from './user.drink.model'

class DrinkModel extends Model<InferAttributes<DrinkModel>, InferCreationAttributes<DrinkModel>> {
    declare drinkId: CreationOptional<number>
    declare type: DrinkType
    declare name: string
    declare country: string
    declare current: boolean
    declare price: number
    declare image?: string
    declare onMenu?: boolean
    declare happyHour?: boolean
    declare description?: string
    
    declare userInfo?: User
    
    declare static associations: {
       user: Association<DrinkModel, UserModel>
    }
}

const drinkSchema = {
    drinkId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.ENUM({ values: ['cocktail', 'bowl', 'neat'] })
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    country: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    current: {
        type: Sequelize.BOOLEAN
    },
    price: {
        type: Sequelize.DECIMAL
    },
    onMenu: {
        type: Sequelize.BOOLEAN
    },
    happyHour: {
        type: Sequelize.BOOLEAN
    },
    sort: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    }
}

DrinkModel.init(drinkSchema, {
  sequelize,
  modelName: "Drink",
  tableName: "drinks",
  timestamps: false
})

DrinkModel.hasOne(UserDrinkModel, {
    foreignKey: 'drinkId',
    sourceKey: 'drinkId',
    as: 'userInfo'
});
            

export default DrinkModel;
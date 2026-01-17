import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'
import { DrinkType } from '../../../types/falseidol/attribute.types'
import UserDrink from './user.drink.model'

export interface FalseIdolDrink {
    id: number
    programId: number
    name: string
    price: string
    country: string
    notes: string | null
    current: boolean
    immortal: boolean
    requested: boolean
    requestedOn: Date | string | null
    approvedBy: string | null
}

class Drink extends Model<InferAttributes<Drink>, InferCreationAttributes<Drink>> {
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
    
    declare userInfo?: NonAttribute<UserDrink>[]
    declare notes?: string | null
    declare orederd?: number
    
    declare addUserInfo: HasManyAddAssociationMixin<UserDrink, number>
    declare removeUserInfo: HasManyRemoveAssociationMixin<UserDrink, number>
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

Drink.init(drinkSchema, {
  sequelize,
  modelName: "drink",
  tableName: "drinks",
  timestamps: false
})

     

export default Drink;
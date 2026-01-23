import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'
import { DrinkType } from '../../../types/falseidol/attribute.types'
import UserDrink from './user.drink.model'
import Setting from '../settings/settings.model'

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

    static async getDrinkById(drinkId: number | string, userId: string) {
        const attributes = ['drinkId', 'type', 'name', 'current', 'onMenu', 'price', 'happyHour', 'image', 'sort']

        const descriptionSetting = await Setting.findByPk(3);

        if (descriptionSetting?.active) {
            attributes.push('description');
        }

        const drinkInstance = await Drink.findByPk(drinkId, {
            rejectOnEmpty: new Error('Drink not found'),
            include: [{
                model: UserDrink,
                as: 'userInfo',
                where: { userId },
                required: false
            }]
        });

        const { userInfo, ...drink }: any = drinkInstance.get({ plain: true });

        return {
            ...drink,
            notes: userInfo[0]?.notes || null,
            ordered: userInfo[0]?.ordered || 0
        }
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

Drink.init(drinkSchema, {
    sequelize,
    modelName: "drink",
    tableName: "drinks",
    timestamps: false
})



export default Drink;
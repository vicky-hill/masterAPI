import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

export type ItemAttributes = InferAttributes<Item, omit>
export type omit = { omit: 'createdAt' | 'updatedAt' }

class Item extends Model<InferAttributes<Item, omit>, InferCreationAttributes<Item, omit>> {
    declare itemId: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare name: string
}

const itemSchema = {
    itemId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}

Item.init(itemSchema, {
  sequelize,
  modelName: "item",
  tableName: "items",
  timestamps: true
})

export default Item;

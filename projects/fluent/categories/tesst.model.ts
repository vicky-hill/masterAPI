import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Category, Group } from '../../../types/fluent/attribute.types'
import CategoryModel from '../categories/categories.model'
import GroupModel from '../groups/groups.model'


class TestModel extends Model<InferAttributes<TestModel>, InferCreationAttributes<TestModel>> {
    declare testId: CreationOptional<number>
    declare name: string
    declare count: number
    declare categoryId: number
    
    declare category?: Category
    declare groups?: Group[]
    
    declare static associations: {
       category: Association<TestModel, CategoryModel>
       groups: Association<TestModel, GroupModel>
    }
}

const testSchema = {
    testId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    count: {
        type: Sequelize.INTEGER
    },
    categoryId: {
        type: Sequelize.INTEGER
    }
}

TestModel.init(testSchema, {
  sequelize,
  modelName: "Test",
  tableName: "tests",
  timestamps: false
})

TestModel.hasOne(CategoryModel, {
    foreignKey: 'categoryId',
    sourceKey: 'categoryId',
    as: 'category'
});
            
TestModel.hasMany(GroupModel, {
    foreignKey: "testId",
    as: 'groups'
});
            

export default TestModel;
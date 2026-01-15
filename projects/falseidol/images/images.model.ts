import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    declare imageId: CreationOptional<number>
    declare name: string
    declare url: string
}

const imagesSchema = {
    imageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    }
}

Image.init(imagesSchema, {
  sequelize,
  modelName: "Images",
  tableName: "images",
  timestamps: false
})


export default Image;
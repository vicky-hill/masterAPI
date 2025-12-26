import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/falseidol.db.config'

export interface Image {
    imageId: number
    name: string
    url: string
}

class ImagesModel extends Model<InferAttributes<ImagesModel>, InferCreationAttributes<ImagesModel>> {
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

ImagesModel.init(imagesSchema, {
  sequelize,
  modelName: "Images",
  tableName: "images",
  timestamps: false
})


export default ImagesModel;
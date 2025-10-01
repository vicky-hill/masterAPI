import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'


class PhraseModel extends Model<InferAttributes<PhraseModel>, InferCreationAttributes<PhraseModel>> {
    declare phraseId: CreationOptional<number>
    declare lessonId: number
    declare text: string
    declare sort: number
}

const phraseSchema = {
    phraseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lessonId: {
        type: Sequelize.INTEGER
    },
    text: {
        type: Sequelize.STRING
    },
    sort: {
        type: Sequelize.INTEGER
    }
}

PhraseModel.init(phraseSchema, {
  sequelize,
  modelName: "Phrase",
  tableName: "phrases",
  timestamps: false
})


export default PhraseModel;
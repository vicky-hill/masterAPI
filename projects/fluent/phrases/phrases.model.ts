import Sequelize, { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Color } from '../../../types/fluent/attribute.types'


class PhraseModel extends Model<InferAttributes<PhraseModel>, InferCreationAttributes<PhraseModel>> {
    declare phraseId: CreationOptional<number>
    declare lessonId: number
    declare text: string
    declare sort: number
    declare originalSort: number
    declare color?: Color | null
    declare pair?: boolean | null
    declare grammar?: string | null
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
    },
    originalSort: {
        type: Sequelize.INTEGER
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pair: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    grammar: {
        type: Sequelize.STRING,
        allowNull: true
    }
}

PhraseModel.init(phraseSchema, {
    sequelize,
    modelName: "Phrase",
    tableName: "phrases",
    timestamps: false
})


export default PhraseModel;
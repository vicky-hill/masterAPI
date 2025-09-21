import Sequelize, { Model, ModelStatic } from 'sequelize'
import sequelize from '../../../config/fluent.db.config'
import { Translation } from '../../../types/fluent/attribute.types'

const TranslationSchema = {
    translationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    language: {
        type: Sequelize.ENUM({ values: ['english', 'spanish', 'french', 'italian'] })
    },
    wordId: {
        type: Sequelize.INTEGER
    },
    base: {
        type: Sequelize.STRING
    },
    masculineSingular: {
        type: Sequelize.STRING
    },
    masculinePlural: {
        type: Sequelize.STRING
    },
    feminineSingular: {
        type: Sequelize.STRING
    },
    femininePlural: {
        type: Sequelize.STRING
    }
}

const TranslationModel: ModelStatic<Model<Translation>> = sequelize.define("translations", TranslationSchema, {
    freezeTableName: false,
    timestamps: false
});

export default TranslationModel;
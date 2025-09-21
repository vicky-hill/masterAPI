"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const sequelize_1 = __importDefault(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const translations_model_1 = __importDefault(require("../translations/translations.model"));
const wordSchema = {
    wordId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupId: {
        type: sequelize_1.default.INTEGER
    },
    categoryId: {
        type: sequelize_1.default.INTEGER
    },
    type: {
        type: sequelize_1.default.ENUM({ values: ['adjective', 'noun', 'verb', 'adverb'] }),
    },
    difficulty: {
        type: sequelize_1.default.ENUM({ values: ['beginner', 'intermediate', 'advanced', 'expert'] }),
    },
    base: {
        type: sequelize_1.default.STRING,
    },
    sort: {
        type: sequelize_1.default.INTEGER,
    }
};
const WordModel = fluent_db_config_1.default.define('words', wordSchema, {
    timestamps: false,
    freezeTableName: true,
});
WordModel.hasMany(translations_model_1.default, {
    foreignKey: "wordId",
    as: 'translations'
});
exports.default = WordModel;


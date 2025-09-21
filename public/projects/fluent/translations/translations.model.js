"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const TranslationSchema = {
    translationId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    language: {
        type: sequelize_1.default.ENUM({ values: ['english', 'spanish', 'french', 'italian'] })
    },
    wordId: {
        type: sequelize_1.default.INTEGER
    },
    base: {
        type: sequelize_1.default.STRING
    },
    masculineSingular: {
        type: sequelize_1.default.STRING
    },
    masculinePlural: {
        type: sequelize_1.default.STRING
    },
    feminineSingular: {
        type: sequelize_1.default.STRING
    },
    femininePlural: {
        type: sequelize_1.default.STRING
    }
};
const TranslationModel = fluent_db_config_1.default.define("translations", TranslationSchema, {
    freezeTableName: false,
    timestamps: false
});
exports.default = TranslationModel;

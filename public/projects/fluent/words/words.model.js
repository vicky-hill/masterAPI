"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const translations_model_1 = __importDefault(require("../translations/translations.model"));
class WordModel extends sequelize_1.Model {
}
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
WordModel.init(wordSchema, {
    sequelize: fluent_db_config_1.default,
    modelName: "Word",
    tableName: "words",
    timestamps: false
});
WordModel.hasMany(translations_model_1.default, {
    foreignKey: "wordId",
    as: 'translations'
});
exports.default = WordModel;

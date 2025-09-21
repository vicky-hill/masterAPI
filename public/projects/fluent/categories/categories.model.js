"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const words_model_1 = __importDefault(require("../words/words.model"));
const categorySchema = {
    categoryId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupId: {
        type: sequelize_1.default.INTEGER,
    },
    name: {
        type: sequelize_1.default.STRING,
    },
    sort: {
        type: sequelize_1.default.INTEGER,
    },
};
const CategoryModel = fluent_db_config_1.default.define('categories', categorySchema, {
    timestamps: false,
    freezeTableName: true,
});
CategoryModel.hasMany(words_model_1.default, {
    foreignKey: "categoryId",
    as: 'words'
});
exports.default = CategoryModel;

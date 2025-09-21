"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const fluent_db_config_1 = __importDefault(require("../../../config/fluent.db.config"));
const words_model_1 = __importDefault(require("../words/words.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const groupSchema = {
    groupId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING,
    }
};
const GroupModel = fluent_db_config_1.default.define('groups', groupSchema, {
    timestamps: false,
    freezeTableName: true,
});
GroupModel.hasMany(words_model_1.default, {
    foreignKey: "groupId",
    as: 'words'
});
GroupModel.hasMany(categories_model_1.default, {
    foreignKey: "groupId",
    as: 'categories'
});
exports.default = GroupModel;

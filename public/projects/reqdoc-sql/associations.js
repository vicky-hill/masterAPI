"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModel = exports.ProjectModel = exports.TeamUserModel = exports.UserModel = exports.TeamModel = void 0;
const teams_model_1 = __importDefault(require("./teams/teams.model"));
exports.TeamModel = teams_model_1.default;
const users_model_1 = __importDefault(require("./users/users.model"));
exports.UserModel = users_model_1.default;
const teams_users_model_1 = __importDefault(require("./teams/teams.users.model"));
exports.TeamUserModel = teams_users_model_1.default;
const projects_model_1 = __importDefault(require("./projects/projects.model"));
exports.ProjectModel = projects_model_1.default;
const features_model_1 = __importDefault(require("./features/features.model"));
exports.FeatureModel = features_model_1.default;
teams_model_1.default.belongsToMany(users_model_1.default, {
    through: teams_users_model_1.default,
    foreignKey: 'teamId',
    otherKey: 'userId',
    as: 'users'
});
users_model_1.default.belongsToMany(teams_model_1.default, {
    through: teams_users_model_1.default,
    foreignKey: 'userId',
    otherKey: 'teamId',
    as: 'teams'
});
users_model_1.default.hasOne(teams_model_1.default, {
    foreignKey: 'teamId',
    sourceKey: 'teamId',
    as: 'team'
});
teams_model_1.default.hasMany(projects_model_1.default, {
    foreignKey: "teamId",
    as: 'projects'
});
features_model_1.default.hasMany(features_model_1.default, {
    foreignKey: "parentId",
    as: 'subFeatures'
});

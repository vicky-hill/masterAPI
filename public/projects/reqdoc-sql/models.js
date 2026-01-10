"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.ReqModel = exports.FeatureModel = exports.ProjectModel = exports.UserModel = exports.TeamModel = void 0;
const teams_model_1 = __importDefault(require("./teams/teams.model"));
exports.TeamModel = teams_model_1.default;
const users_model_1 = __importDefault(require("./users/users.model"));
exports.UserModel = users_model_1.default;
const projects_model_1 = __importDefault(require("./projects/projects.model"));
exports.ProjectModel = projects_model_1.default;
const features_model_1 = __importDefault(require("./features/features.model"));
exports.FeatureModel = features_model_1.default;
const reqs_model_1 = __importDefault(require("./reqs/reqs.model"));
exports.ReqModel = reqs_model_1.default;
const comments_model_1 = __importDefault(require("./comments/comments.model"));
exports.CommentModel = comments_model_1.default;
users_model_1.default.belongsToMany(teams_model_1.default, {
    through: 'teamUsers',
    foreignKey: 'userId',
    otherKey: 'teamId'
});
teams_model_1.default.belongsToMany(users_model_1.default, {
    through: 'teamUsers',
    foreignKey: 'teamId',
    otherKey: 'userId'
});
users_model_1.default.belongsTo(teams_model_1.default, {
    foreignKey: 'teamId'
});
teams_model_1.default.hasMany(projects_model_1.default, {
    foreignKey: "teamId"
});
projects_model_1.default.belongsTo(teams_model_1.default, {
    foreignKey: 'teamId'
});
projects_model_1.default.hasMany(features_model_1.default, {
    foreignKey: 'projectId'
});
features_model_1.default.belongsTo(projects_model_1.default, {
    foreignKey: 'projectId'
});
features_model_1.default.hasMany(features_model_1.default, {
    foreignKey: 'parentId',
    as: 'subFeatures'
});
features_model_1.default.belongsTo(features_model_1.default, {
    foreignKey: 'parentId',
    as: 'mainFeature'
});
features_model_1.default.hasMany(reqs_model_1.default, {
    foreignKey: 'featureId'
});
reqs_model_1.default.belongsTo(features_model_1.default, {
    foreignKey: 'featureId'
});
reqs_model_1.default.hasMany(reqs_model_1.default, {
    sourceKey: 'changedReq',
    foreignKey: 'key',
    as: 'history'
});
reqs_model_1.default.hasMany(comments_model_1.default, {
    foreignKey: 'reqId'
});
comments_model_1.default.belongsTo(reqs_model_1.default, {
    foreignKey: 'reqId'
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqModel = exports.FeatureModel = exports.ProjectModel = exports.UserModel = exports.TeamModel = void 0;
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

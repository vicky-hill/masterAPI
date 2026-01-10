"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = exports.ProfileModel = exports.PostModel = exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const users_model_1 = __importDefault(require("../users/users.model"));
exports.UserModel = users_model_1.default;
const posts_model_1 = __importDefault(require("../posts/posts.model"));
exports.PostModel = posts_model_1.default;
const profiles_model_1 = __importDefault(require("../profiles/profiles.model"));
exports.ProfileModel = profiles_model_1.default;
const tags_model_1 = __importDefault(require("../tags/tags.model"));
exports.TagModel = tags_model_1.default;
const postTags_model_1 = __importDefault(require("../tags/postTags.model"));
users_model_1.default.hasOne(profiles_model_1.default, {
    foreignKey: 'userId'
});
profiles_model_1.default.belongsTo(users_model_1.default, {
    foreignKey: 'userId'
});
users_model_1.default.hasMany(posts_model_1.default, {
    foreignKey: 'userId'
});
users_model_1.default.hasMany(posts_model_1.default, {
    foreignKey: 'userId',
    scope: {
        views: { [sequelize_1.Op.gt]: 5 }
    },
    as: 'activePosts'
});
posts_model_1.default.belongsTo(users_model_1.default, {
    foreignKey: 'userId'
});
tags_model_1.default.belongsToMany(posts_model_1.default, {
    through: postTags_model_1.default,
    foreignKey: 'tagId',
    otherKey: 'postId'
});
posts_model_1.default.belongsToMany(tags_model_1.default, {
    through: postTags_model_1.default,
    foreignKey: 'postId',
    otherKey: 'tagId'
});

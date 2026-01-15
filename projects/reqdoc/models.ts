import { InferAttributes } from 'sequelize'
import Team from './teams/teams.model'
import UserModel from './users/users.model'
import Project from './projects/projects.model'
import Feature from './features/features.model'
import Req from './reqs/reqs.model'
import Comment from './comments/comments.model'


export type omit = { omit: 'createdAt' | 'updatedAt' | 'deletedAt' };

export type User = InferAttributes<UserModel>

UserModel.belongsToMany(Team, {
  through: 'teamUsers',
  foreignKey: 'userId',
  otherKey: 'teamId'
})

Team.belongsToMany(UserModel, {
  through: 'teamUsers',
  foreignKey: 'teamId',
  otherKey: 'userId'
})

UserModel.belongsTo(Team, {
  foreignKey: 'teamId'
});

Team.hasMany(Project, {
  foreignKey: "teamId"
});

Project.belongsTo(Team, {
  foreignKey: 'teamId'
})

Project.hasMany(Feature, {
  foreignKey: 'projectId'
})

Project.hasMany(Req, {
  foreignKey: 'projectId'
})

Req.belongsTo(Project, {
  foreignKey: 'projectId'
})

Feature.belongsTo(Project, {
  foreignKey: 'projectId'
})

Feature.hasMany(Feature, {
  foreignKey: 'parentId',
  as: 'subFeatures'
});

Feature.belongsTo(Feature, {
  foreignKey: 'parentId',
  as: 'mainFeature'
})

Feature.hasMany(Req, {
  foreignKey: 'featureId',
  onDelete: 'CASCADE',
  hooks: true
})

Req.belongsTo(Feature, {
  foreignKey: 'featureId'
})

Req.hasMany(Req, {
  sourceKey: 'key',
  foreignKey: 'changedReq',
  as: 'history'
})

Req.hasMany(Comment, {
  foreignKey: 'reqId'
})

Comment.belongsTo(Req, {
  foreignKey: 'reqId'
})

UserModel.hasMany(Comment, {
  foreignKey: 'userId'
})

Comment.belongsTo(UserModel, {
  foreignKey: 'userId'
})

export {
  Team,
  UserModel,
  Project,
  Feature,
  Req,
  Comment
}

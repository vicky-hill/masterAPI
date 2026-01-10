import TeamModel from './teams/teams.model'
import UserModel from './users/users.model'
import ProjectModel from './projects/projects.model'
import FeatureModel from './features/features.model'
import ReqModel from './reqs/reqs.model'
import CommentModel from './comments/comments.model'

export type omit = { omit: 'createdAt' | 'updatedAt' | 'deletedAt' };

UserModel.belongsToMany(TeamModel, {
  through: 'teamUsers',
  foreignKey: 'userId',
  otherKey: 'teamId'
})

TeamModel.belongsToMany(UserModel, {
  through: 'teamUsers',
  foreignKey: 'teamId',
  otherKey: 'userId'
})

UserModel.belongsTo(TeamModel, {
  foreignKey: 'teamId'
});

TeamModel.hasMany(ProjectModel, {
  foreignKey: "teamId"
});

ProjectModel.belongsTo(TeamModel, {
  foreignKey: 'teamId'
})

ProjectModel.hasMany(FeatureModel, {
  foreignKey: 'projectId'
})

FeatureModel.belongsTo(ProjectModel, {
  foreignKey: 'projectId'
})

FeatureModel.hasMany(FeatureModel, {
  foreignKey: 'parentId',
  as: 'subFeatures'
});

FeatureModel.belongsTo(FeatureModel, {
  foreignKey: 'parentId',
  as: 'mainFeature'
})

FeatureModel.hasMany(ReqModel, {
  foreignKey: 'featureId'
})

ReqModel.belongsTo(FeatureModel, {
  foreignKey: 'featureId'
})

ReqModel.hasMany(ReqModel, {
  sourceKey: 'changedReq',
  foreignKey: 'key',
  as: 'history'
})

ReqModel.hasMany(CommentModel, {
  foreignKey: 'reqId'
})

CommentModel.belongsTo(ReqModel, {
  foreignKey: 'reqId'
})


export {
  TeamModel,
  UserModel,
  ProjectModel,
  FeatureModel,
  ReqModel,
  CommentModel
}

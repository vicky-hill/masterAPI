import TeamModel from './teams/teams.model'
import UserModel from './users/users.model'
import TeamUserModel from './teams/teams.users.model'
import ProjectModel from './projects/projects.model'
import FeatureModel from './features/features.model'
import ReqModel from './reqs/reqs.model'

TeamModel.belongsToMany(UserModel, {
  through: TeamUserModel,
  foreignKey: 'teamId',
  otherKey: 'userId',
  as: 'users'
})

UserModel.belongsToMany(TeamModel, {
  through: TeamUserModel,
  foreignKey: 'userId',
  otherKey: 'teamId',
  as: 'teams'
})

UserModel.hasOne(TeamModel, {
  foreignKey: 'teamId',
  sourceKey: 'teamId',
  as: 'team'
});

TeamModel.hasMany(ProjectModel, {
  foreignKey: "teamId",
  as: 'projects'
});

FeatureModel.hasMany(FeatureModel, {
  foreignKey: 'parentId',
  as: 'subFeatures'
});

FeatureModel.belongsTo(FeatureModel, {
  foreignKey: 'parentId',
  as: 'mainFeature'
})

FeatureModel.belongsTo(ProjectModel, {
  foreignKey: 'projectId',
  as: 'project'
});

FeatureModel.hasMany(ReqModel, {
  foreignKey: 'featureId',
  as: 'reqs'
})

ProjectModel.belongsTo(TeamModel, {
  foreignKey: 'teamId',
  as: 'team'
})

ReqModel.hasMany(ReqModel, {
  sourceKey: 'changedReq',
  foreignKey: 'key',
  as: 'history'
})




export {
  TeamModel,
  UserModel,
  TeamUserModel,
  ProjectModel,
  FeatureModel,
  ReqModel
}

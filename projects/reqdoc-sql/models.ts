import TeamModel from './teams/teams.model'
import UserModel from './users/users.model'
import ProjectModel from './projects/projects.model'
import FeatureModel from './features/features.model'
import ReqModel from './reqs/reqs.model'

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








// TeamModel.hasMany(ProjectModel, {
//   foreignKey: "teamId",
//   as: 'projects'
// });
// 
// FeatureModel.hasMany(FeatureModel, {
//   foreignKey: 'parentId',
//   as: 'subFeatures'
// });
// 
// FeatureModel.belongsTo(FeatureModel, {
//   foreignKey: 'parentId',
//   as: 'mainFeature'
// })
// 
// FeatureModel.belongsTo(ProjectModel, {
//   foreignKey: 'projectId',
//   as: 'project'
// });
// 
// FeatureModel.hasMany(ReqModel, {
//   foreignKey: 'featureId',
//   as: 'reqs'
// })
// 
// ProjectModel.belongsTo(TeamModel, {
//   foreignKey: 'teamId',
//   as: 'team'
// })
// 
// ReqModel.hasMany(ReqModel, {
//   sourceKey: 'changedReq',
//   foreignKey: 'key',
//   as: 'history'
// })




export {
  TeamModel,
  UserModel,
  ProjectModel,
  FeatureModel,
  ReqModel
}

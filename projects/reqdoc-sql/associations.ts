import TeamModel from './teams/teams.model'
import UserModel from './users/users.model'
import TeamUserModel from './teams/teams.users.model'
import ProjectModel from './projects/projects.model'
import FeatureModel from './features/features.model'

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
  foreignKey: "parentId",
  as: 'subFeatures'
});

export { 
  TeamModel, 
  UserModel, 
  TeamUserModel,
  ProjectModel,
  FeatureModel
}

import { ProjectModel } from '../models'
import TeamModel from './teams.model'

export const getTeams = async () => {
    const teams= await TeamModel.findAll({
        include: [ProjectModel]
    });

    return teams;
}
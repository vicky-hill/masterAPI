import { ProjectModel } from '../associations'
import TeamModel from './teams.model'

export const getTeams = async () => {
    const teamInstances = await TeamModel.findAll({
        include: [{
            model: ProjectModel,
            as: 'projects'
        }]
    });

    const teams = teamInstances.map((teamInstance) => {
        const team = teamInstance.get({ plain: true });
        return { ...team };
    })

    return teams;
}
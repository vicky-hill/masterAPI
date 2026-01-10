import { includeFeatures, includeTeam } from '../utils/include'
import { checkProjectAccess } from '../utils/access'
import { getValue, setValue } from '../../../utils/redis'
import { ReqModel, ProjectModel } from '../models'
import { CreateProject } from '../../../types/reqdoc/payload.types'
import validate from '../utils/validation'

export const getProjects = async (teamId: any) => {
//     const projectInstances = await ProjectModel.findAll({
//         where: { teamId, deleted: null },
//         include: [includeFeatures]
//     })
// 
//     return projectInstances.map(projectInstance => {
//         const project = projectInstance.get({ plain: true });
// 
//         return {
//             ...project,
//             firstFeatureId: project.features?.length && project.features[0].featureId
//         }
//     })
}

export const getProject = async (projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    const cacheKey = `projects:project:${projectId}`;
    const cached = await getValue(cacheKey);
    if (cached) return cached;

    const projectInstance = await ProjectModel.findByPk(projectId, {
        include: [
            includeFeatures,
            includeTeam
        ]
    })
    
    if (!projectInstance) throw new Error('No project found');

//     const project = projectInstance.get({ plain: true });
// 
//     const reqs = await ReqModel.findAll({
//         where: { projectId, changedReq: null, deleted: null },
//         order: ['sort', 'ASC']
//     })

    // const project = {
    //     _id: project._id,
    //     id: project.id,
    //     key: project.key,
    //     team: project.team,
    //     slug: project.slug,
    //     mame: project.name,
    //     first_feature: project.first_feature
    // }

//     const features = project.features;
//     const data = { project, features, reqs };
// 
//     await setValue(cacheKey, data);

    // return data;
}


export const createProject = async (data: CreateProject, teamId: any) => {
    await validate.createProject({ data, teamId });

    const project = await ProjectModel.create({
        ...data, teamId
    });

    return project;
}

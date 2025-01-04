import Req from '../reqs/reqs.model'
import Project from './projects.model'
import throwError from '../../../utils/throwError'
import { ProjectAttributes } from '../../../types/reqdoc/attributes.types'
import { features as featuresPopulation, history, subFeatures, team } from '../utils/populate'
import { checkProjectAccess } from '../utils/access'
import { CreateProject, UpdateProject } from '../../../types/reqdoc/payloads.types'
import validate from '../utils/validation'
import { cascadeDeleteProject } from '../utils/delete'


export const getProjects = async (team: any) => {
    const projects: ProjectAttributes[] = await Project.find({ team, deleted: { $exists: false } })
        .populate(featuresPopulation);

    const response = {
        data: projects.map(({ _id, name, slug, first_feature, team }) => ({
            _id, name, slug, team, first_feature
        }))
    }

    return response;
}


export const getProject = async (projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    const projectInstance: ProjectAttributes | null = await Project.findById(projectId)
        .populate([{
            ...featuresPopulation,
            populate: subFeatures
        }, team])

    if (!projectInstance) return throwError('Project not found')

    const projectObject = projectInstance.toObject();

    const reqs = await Req
        .find({
            project: projectId,
            changed_req: { $exists: false },
            deleted: { $exists: false }
        })
        .populate([history])
        .sort({ sort: 1 });

    const project = {
        _id: projectObject._id,
        id: projectObject.id,
        key: projectObject.key,
        team: projectObject.team,
        slug: projectObject.slug,
        mame: projectObject.name,
        first_feature: projectObject.first_feature
    }

    const features = projectObject.features;
    const data = { project, features, reqs };

    // redisClient.get('project', (err, project) => {
    //     if (err) console.log(err)
    //     if (photos) {
    //         return res.json(JSON.parse(project))
    //     } else {
    //         return res.json({ msg: 'no redis cache'})
    //     }
    // })

    // redisClient.set('project', JSON.stringify(data));

    return data;
}


export const createProject = async (data: CreateProject, team: any) => {
    await validate.createProject({ data, team });

    const project: ProjectAttributes = await Project.create({
        ...data, team
    });

    return project;
}


export const deleteProject = async (projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    const project = await cascadeDeleteProject(projectId);

    return project;
}


export const updateProject = async (data: UpdateProject, projectId: string, userId: string) => {
    await validate.updateProject(data);

    await checkProjectAccess(projectId, userId);

    const project = await Project.findByIdAndUpdate(projectId, data, { new: true });

    return project;
}
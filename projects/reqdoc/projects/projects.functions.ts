import { includeFeatures, includeTeam, includeReqs } from '../utils/include'
import { Project, Team } from '../models'
import validate from '../utils/validation'

interface CreateProject {
    name: string
    projectKey: string
    reqKey: string
}

interface UpdateProject {
    name?: string
    projectKey?: string
}

export const getProjectsByTeam = async (teamId: any) => {
    const projects = await Project.findAll({
        where: { teamId },
        include: [includeFeatures]
    })

    return projects;
}

export const getProjectById = async (projectId: string, userId: string) => {
    const project = await Project.findByPk(projectId, {
        rejectOnEmpty: new Error('No project found'),
        include: [
            includeFeatures,
            includeTeam,
            includeReqs
        ]
    })

    await project.checkAccess(userId);

    return project;
}

export const createProject = async (data: CreateProject, teamId: number, userId: string) => {
    await validate.createProject(data);
    await Team.checkAccess(teamId, userId);

    const project = await Project.create({
        ...data, teamId
    });

    return project;
}

export const deleteProject = async (projectId: string, userId: string) => {
    const project = await Project.findByPk(projectId, {
        rejectOnEmpty: new Error('Project not found')
    })

    await project.checkAccess(userId);
    await project.destroy();

    return project;
}

export const updateProject = async (data: UpdateProject, projectId: string, userId: string) => {
    const project = await Project.findByPk(projectId, {
        rejectOnEmpty: new Error('Project not found')
    })

    await validate.updateProject(data);
    await project.checkAccess(userId);
    await project.update(data, { fields: ['name', 'projectKey'] });

    return project;
}
import { Request, Response, NextFunction } from 'express'
import * as Project from './projects.functions'

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { team } = req.user;

        const projects = await Project.getProjects(team);
        res.json(projects);
    } catch (err: any) {
        next(err);
    }
}

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;

        const data = await Project.getProject(projectId, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.user;

        const project = await Project.createProject(req.body, teamId);
        res.json(project);
    } catch (err: any) {
        next(err);
    }
}
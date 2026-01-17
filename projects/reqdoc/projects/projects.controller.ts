import { Request, Response, NextFunction } from 'express'
import * as Project from './projects.functions'

export const getProjectsByTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.user;

        const projects = await Project.getProjectsByTeam(teamId);
        res.json(projects);
    } catch (err: any) {
        next(err);
    }
}

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;

        const data = await Project.getProjectById(projectId as string, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId, userId } = req.user;

        const project = await Project.createProject(req.body, teamId, userId);
        res.json(project);
    } catch (err: any) {
        next(err);
    }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.params;
    
    const project = await Project.updateProject(req.body, projectId as string, userId);
    res.json(project)
  } catch (err) {
    next(err)
  }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;
    
    const project = await Project.deleteProject(projectId as string, userId as string);
    res.json(project)
  } catch (err) {
    next(err)
  }
}
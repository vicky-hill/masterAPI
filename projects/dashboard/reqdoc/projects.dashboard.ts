import Project from '../../reqdoc/projects/projects.model'
import { Request, Response, NextFunction } from 'express'
import { ProjectAttributes } from '../../../types/reqdoc/attributes.types'  
import { CreateProject, UpdateProject } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects: ProjectAttributes[] = await Project.find();
        res.json(projects);
    } catch (err: any) {
        err.ctrl = getProjects;
        next(err);
    }
}

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;

        const project: ProjectAttributes | null = await Project.findById(projectId);
        if (!project) return throwError('Project not found');
        
        res.json(project);
    } catch (err: any) {
        err.ctrl = getProject;
        next(err);
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateProject;

        const project: ProjectAttributes | null = await Project.create(req.body);
        
        res.json(project);    
    } catch (err: any) {
        err.ctrl = createProject;
        next(err);
    }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateProject;

        const { projectId } = req.params;

        const updatedProject: ProjectAttributes | null = await Project.findByIdAndUpdate(
            projectId, req.body, { new: true }
        );
    
        res.json(updatedProject);    
    } catch (err: any) {
        err.ctrl = updateProject;
        next(err);
    }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findByIdAndDelete(projectId);
        
        res.json(project);    
    } catch (err: any) {
        err.ctrl = deleteProject;
        next(err);
    }
}
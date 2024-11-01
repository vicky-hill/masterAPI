import Project from './projects.model'
import Req from '../reqs/reqs.model'
import { Request, Response, NextFunction } from 'express'
import throwError from '../../../utils/throwError'
import { ProjectAttributes } from '../../../types/reqdoc/attributes.types'
import { feature as featuresPopulation, history, subFeatures, team } from '../utils/populate'
import { checkProjectAccess } from '../utils/access'
import validate from '../utils/validation'
import { CreateProject, UpdateProject } from '../../../types/reqdoc/payloads.types'
import { cascadeDeleteProject } from '../utils/delete'

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { team } = req.user;

        const projects: ProjectAttributes[] = await Project.find({ team, deleted: { $exists: false } })
            .populate(featuresPopulation);

        const response = {
            data: projects.map(({ _id, name, slug, first_feature, team }) => ({
                _id, name, slug, team, first_feature
            }))
        }

        res.json(response);
    } catch (err: any) {
        err.ctrl = getProjects;
        next(err);
    }
}

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const projectInstance: ProjectAttributes | null = await Project.findById(projectID)
            .populate([{
                ...featuresPopulation,
                populate: subFeatures
            }, team])

        if (!projectInstance) return throwError('Project not found')

        const projectObject = projectInstance.toObject();

        const reqs = await Req
            .find({
                project: projectID,
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

        res.json(data);
    } catch (err: any) {
        err.ctrl = getProject;
        next(err);
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateProject;

        const { team } = req.user;

        await validate.createProject({ ...req.body, team });

        const project: ProjectAttributes = await Project.create({
            ...req.body, team
        });

        res.json(project);
    } catch (err: any) {
        err.ctrl = createProject;
        next(err);
    }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const project = await cascadeDeleteProject(projectID);

        res.json(project);
    } catch (err: any) {
        err.ctrl = deleteProject;
        next(err);
    }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateProject;

        const { projectID } = req.params;
        const { userID } = req.user;

        await validate.updateProject(req.body);

        await checkProjectAccess(projectID, userID);

        const project = await Project.findByIdAndUpdate(projectID, req.body, { new: true });

        res.json(project);
    } catch (err: any) {
        err.ctrl = updateProject;
        next(err);
    }
}
const Project = require('./projects.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')

/**
 * Get projects
 * @returns {array<Project>}
 */
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ data: projects });
    } catch (err) {
        err.errorCode = 'projects_001';
        next(err);
    }
}

/**
 * Get project by ID
 * @param  {objectId} projectID
 * @returns {Project}
 */
const getProject = async (req, res) => {
    try {
        const { projectID } = req.params;

        const project = await Project.findById(projectID)
            .populate({
                path: 'features',
                match: { main_feature: { $exists: false } },
                populate: {
                    path: 'sub_features',
                    options: { sort: { sort: 'asc' }}
                },
                options: { sort: { sort: 'asc' }}
            })

        if (!project) throwError('Project not found');

        res.json(project);
    } catch (err) {
        err.errorCode = 'projects_002';
        next(err);
    }
}

/**
 * Create a project
 * @property {String} req.body.name 
 * @returns {Project}
 */
const createProject = async (req, res) => {
    try {
        await validate.createProject(req.body);

        const project = await Project.create({
            ...req.body,
        });

        res.json(project);
    } catch (err) {
        err.errorCode = 'projects_003';
        next(err);
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject
}
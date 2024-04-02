const Project = require('./projects.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')
const { checkProjectAccess } = require('../utils/access')
const { cascadeDeleteProject } = require('../utils/delete')
const { features, subFeatures, team } = require('../utils/populate')

/**
 * Get projects
 * @returns {array<Project>}
 */
const getProjects = async (req, res, next) => {
    try {
        const { team } = req.user;

        const projects = await Project.find({ team, deleted: { $exists: false } })
            .populate(features);

        const response = {
            data: projects.map(({ _id, name, slug, first_feature, team }) => ({
                _id, name, slug, team, first_feature
            }))
        }

        res.json(response);
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
const getProject = async (req, res, next) => {
    try {
        const { projectID } = req.params;
       const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const project = await Project.findById(projectID)
            .populate([{
                ...features,
                populate: subFeatures
            }, team])

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
 * @property {String} req.body.slug 
 * @property {String} req.body.key 
 * @returns {Project}
 */
const createProject = async (req, res, next) => {
    try {
        const { team } = req.user;

        await validate.createProject({ ...req.body, team });

        const project = await Project.create({
            ...req.body, team
        });

        res.json(project);
    } catch (err) {
        err.errorCode = 'projects_003';
        next(err);
    }
}

/**
 * Delete project
 * @param projectID
 * @returns {Project}
 */
const deleteProject = async (req, res, next) => {
    try {
        const { projectID } = req.params;
       const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const project = await cascadeDeleteProject(projectID);

        res.json(project);
    } catch (err) {
        err.errorCode = 'projects_003';
        next(err);
    }
}

/**
 * Update project
 * @param projectID
 * @property req.body.name
 * @property req.body.slug
 * @returns {Project}
 */
const updateProject = async (req, res, next) => {
    try {
        const { projectID } = req.params;
       const { userID } = req.user;

        await validate.updateProject(req.body);

        await checkProjectAccess(projectID, userID);

        const project = await Project.findByIdAndUpdate(projectID, req.body, { new: true});

        res.json(project);
    } catch (err) {
        err.errorCode = 'projects_003';
        next(err);
    }
}

module.exports = {
    getProjects,
    getProject,
    deleteProject,
    createProject,
    updateProject
}
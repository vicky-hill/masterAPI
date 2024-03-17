const Project = require('./projects.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')
const { checkProjectAccess } = require('../utils/access')

/**
 * Get projects
 * @returns {array<Project>}
 */
const getProjects = async (req, res, next) => {
    try {
        const { team } = req.user;

        const projects = await Project.find({ team })
            .populate({ path: 'features', select: '_id', options: { sort: { sort: 'asc' }} });

        const response = {
            data: projects.map(({ _id, name, key, first_feature, team }) => ({
                _id, name, key, team, first_feature
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
        const { _id: userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const project = await Project.findById(projectID)
            .populate({
                path: 'features',
                match: { main_feature: { $exists: false } },
                populate: {
                    path: 'sub_features',
                    options: { sort: { sort: 'asc' } }
                },
                options: { sort: { sort: 'asc' } }
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
        const { _id: userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const project = await Project.findByIdAndDelete(projectID);

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
    createProject
}
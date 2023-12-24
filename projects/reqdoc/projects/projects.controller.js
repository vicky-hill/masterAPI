const Project = require('./projects.model')
const validate = require('../utils/validation')

/**
 * Get projects
 * @returns {array<Project>}
 */
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.log(err);
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
                    path: 'sub_features'
                }
            })

        if (!project) return sendError(next, 404, {
          error: `Project nof found`,
        });

        res.json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
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
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = {
    getProjects,
    getProject,
    createProject
}
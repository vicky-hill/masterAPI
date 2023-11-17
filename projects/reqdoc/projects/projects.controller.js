const Project = require('./projects.model');

/**
 * Get projects
 * @returns [{ project }]
 */
async function getProjects(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get project by ID
 * @param id - ID of project to fetch
 * @returns project {}   
 */
async function getProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a project
 * @property {String} req.body.name 
 * @returns project {}   
 */
async function createProject(req, res) {
    try {
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
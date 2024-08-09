const Project = require('./projects.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')
const { checkProjectAccess } = require('../utils/access')
const { cascadeDeleteProject } = require('../utils/delete')
const { features: featuresPopulation, subFeatures, team, history } = require('../utils/populate')
const Req = require('../reqs/reqs.model')
// const Redis = require('redis');

// const redisClient = Redis.createClient({
//     password: 'Gy1ftk9JdqT47J0fRNx9lPTG10VtpGjK',
//     socket: {
//         host: 'redis-17159.c331.us-west1-1.gce.redns.redis-cloud.com',
//         port: 17159
//     }
// });

const ProjectController = () => {
    getProject()
    getProjects()
    createProject()
    deleteProject()
    updateProject()
}

/**
 * Get Projects
 * @returns {array<Project>}
 */
const getProjects = async (req, res, next) => {
    try {
        const { team } = req.user;

        const projects = await Project.find({ team, deleted: { $exists: false } })
            .populate(featuresPopulation);

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
 * @returns { {Project}, [<Feature>], [<Reqs>]}
 */
const getProject = async (req, res, next) => {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const projectInstance = await Project.findById(projectID)
            .populate([{
                ...featuresPopulation,
                populate: subFeatures
            }, team])

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

        const project = await Project.findByIdAndUpdate(projectID, req.body, { new: true });

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
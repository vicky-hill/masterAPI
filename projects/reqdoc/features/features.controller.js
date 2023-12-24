const Feature = require('./features.model')
const validate = require('../utils/validation')

/**
 * Get features
 * @param {objectId} projectID
 * @returns {array<Feature>}
 */
const getFeatures = async (req, res) => {
    try {
        const { projectID } = req.param;

        const features = await Feature
            .find({ project: projectID })
            .sort({ sort: 1 });

        res.json(features);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get feature by ID
 * @param {objectId} featureID 
 * @returns {Feature}  
 */
const getFeature = async (req, res) => {
    try {
        const { featureID } = req.params;

        const feature = await Feature
            .findById(featureID)
            .populate([{
                path: 'sub_features'
            }, {
                path: 'reqs',
                match: { changed_req: { $exists: false } }
            }]);

        if (!feature) return sendError(next, 404, {
          error: `Feature not found`,
        });
        
        res.json(feature);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Create a feature
 * @property {String} req.body.name 
 * @property {String} req.body.project 
 * @returns {Feature}
 */
const createFeature = async (req, res) => {
    try {
        const projectID = req.body.project;

        await validate.createFeature(req.body);
        
        const features = await Feature.find({ project: req.body.project });

        if (!features) return sendError(next, 404, {
          error: `Features with the project _id ${projectID} could not be found`
        });

        const feature = await Feature.create({
            ...req.body,
            sort: features.length
        });

        res.json(feature);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Update feature
 * @params id
 * @property {String} req.body.name 
 * @returns feature {}   
 */
const updateFeature = async (req, res, next) => {
    try {
        await validate.updateFeature(req.body);

        const updatedFeature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedFeature) {
            return res.status(404).json({ msg: "Feature not found" });
        }

        const feature = await Feature.findById(updatedFeature._id);

        res.status(200).json(feature);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a sub feature
 * @param featureID
 * @property {String} req.body.name 
 * @returns location {}   
 */
const createSubFeature = async (req, res) => {
    try {
        const { featureID } = req.params;

        await validate.updateFeature(req.body);

        const feature = await Feature.findById(featureID).populate('sub_features');

        if (!feature) return sendError(next, 404, {
          error: `Feature not found`
        });

        const subFeature = await Feature.create({
            ...req.body,
            project: feature.project,
            sort: feature.sub_features.length,
            main_feature: featureID
        });

        res.json(subFeature);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    getFeatures,
    getFeature,
    createFeature,
    updateFeature,
    createSubFeature
}
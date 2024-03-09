const Feature = require('./features.model')
const Req = require('../reqs/reqs.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')

/**
 * Get features
 * @param {objectId} projectID
 * @returns {array<Feature>}
 */
const getFeatures = async (req, res, next) => {
    try {
        const { projectID } = req.param;

        const features = await Feature
            .find({ project: projectID })
            .sort({ sort: 1 })

        res.json({ data: features });
    } catch (err) {
        err.errorCode = 'features_001';
        next(err);
    }
}

/**
 * Get feature by ID
 * @param {objectId} featureID 
 * @returns {Feature}  
 */
const getFeature = async (req, res, next) => {
    try {
        const { featureID } = req.params;

        const feature = await Feature
            .findById(featureID)
            .populate([{
                path: 'sub_features',
                populate: [{
                    path: 'reqs',
                    match: { changed_req: { $exists: false } },
                    populate: { path: 'steps', select: 'text', options: { sort: { createdAt: 'asc' } } },
                    options: { sort: { sort: 'asc' } }
                }, {
                    path: 'main_feature',
                    select: 'name'
                }],
            }, {
                path: 'reqs',
                match: { changed_req: { $exists: false } },
                populate: { path: 'steps', select: 'text', options: { sort: { createdAt: 'asc' } } }
            }]);

        if (!feature) throwError('Feature not found');

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();
        
        feature.reqs = JSON.parse(JSON.stringify([...feature.reqs, ...subFeatureReqs]))
        feature.sub_features = feature.sub_features.map(sub_feature => JSON.parse(JSON.stringify({...sub_feature, reqs: null })))
        
        res.json(feature);
    } catch (err) {
        err.errorCode = 'features_002';
        next(err);
    }
}

/**
 * Create a feature
 * @property {String} req.body.name 
 * @property {String} req.body.project 
 * @returns {Feature}
 */
const createFeature = async (req, res, next) => {
    try {
        const projectID = req.body.project;

        await validate.createFeature(req.body);

        const features = await Feature.find({ project: req.body.project });

        if (!features) throwError(`Features with the project _id ${projectID} not be found`);

        const feature = await Feature.create({
            ...req.body,
            sort: features.length
        });

        res.json(feature);
    } catch (err) {
        err.errorCode = 'features_003';
        next(err);
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

        if (!updatedFeature) throwError(`Feature not found`);

        const feature = await Feature.findById(updatedFeature._id);

        res.status(200).json(feature);
    } catch (err) {
        err.errorCode = 'features_004';
        next(err);
    }
}

/**
 * Create a sub feature
 * @param featureID
 * @property {String} req.body.name 
 * @returns location {}   
 */
const createSubFeature = async (req, res, next) => {
    try {
        const { featureID } = req.params;

        await validate.updateFeature(req.body);

        const feature = await Feature.findById(featureID).populate('sub_features');

        if (!feature) throwError('Feature not found')

        const subFeature = await Feature.create({
            ...req.body,
            project: feature.project,
            sort: feature.sub_features.length,
            main_feature: featureID
        });

        res.json(subFeature);
    } catch (err) {
        err.errorCode = 'features_005';
        next(err);
    }
}


module.exports = {
    getFeatures,
    getFeature,
    createFeature,
    updateFeature,
    createSubFeature
}
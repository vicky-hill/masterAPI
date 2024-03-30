const Feature = require('./features.model')
const validate = require('../utils/validation')
const throwError = require('../../../utils/throwError')
const { checkFeatureAccess, checkProjectAccess } = require('../utils/access')
const { cascadeDeleteFeature } = require('../utils/delete')
const { history, reqs } = require('../utils/populate')

/**
 * Get features
 * @param {objectId} projectID
 * @returns {array<Feature>}
 */
const getFeatures = async (req, res, next) => {
    try {
        const { projectID } = req.param;

        const features = await Feature
            .match({ deleted: { $exists: false } })
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
       const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const feature = await Feature
            .findById(featureID)
            .populate([
                reqs, 
                {
                    path: 'sub_features',
                    options: { sort: { sort: 'asc' } },
                    populate: reqs,
                }, 
                {
                    path: 'main_feature',
                    select: 'name'
                }
            ]);

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

        feature.reqs = JSON.parse(JSON.stringify([...feature.reqs.sort((a, b) => a.sort - b.sort), ...subFeatureReqs]))
        feature.sub_features = feature.sub_features.map(sub_feature => JSON.parse(JSON.stringify({ ...sub_feature, reqs: null })))

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
        const userID = req.user._id;

        await checkProjectAccess(projectID, userID);

        await validate.createFeature(req.body);

        const features = await Feature.find({ project: req.body.project });

        if (!features) throwError(`Features with the project _id ${projectID} not be found`);

        const feature = await Feature.create({
            ...req.body,
            sort: features.length + 1
        });

        res.json(feature);
    } catch (err) {
        err.errorCode = 'features_003';
        next(err);
    }
}

/**
 * Update feature
 * @params featureID
 * @property {String} req.body.name 
 * @returns feature {}   
 */
const updateFeature = async (req, res, next) => {
    try {
        const { featureID } = req.params;
       const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        await validate.updateFeature(req.body);

        const updatedFeature = await Feature.findByIdAndUpdate(featureID, req.body, { new: true });

        if (!updatedFeature) throwError(`Feature to update not found`);

        const feature = await Feature.findById(updatedFeature._id);

        res.status(200).json(feature);
    } catch (err) {
        err.errorCode = 'features_004';
        next(err);
    }
}

/**
 * Delete feature
 * @params featureID
 * @property {String} req.body.name 
 * @returns feature {}   
 */
const deleteFeature = async (req, res, next) => {
    try {
        const { featureID } = req.params;
       const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const deletedFeature = await cascadeDeleteFeature(featureID);

        res.status(200).json(deletedFeature);
    } catch (err) {
        err.errorCode = 'features_005';
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
       const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

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
        err.errorCode = 'features_006';
        next(err);
    }
}

/**
 * Sort features
 * @get /features/sort
 * @property req.body [{ _id, sort }]
 * @returns { data: [{ Feature }] }
 */
const sortFeatures = async (req, res, next) => {
    try {
        await validate.sort(req.body);
       const { userID } = req.user;

        await checkFeatureAccess(req.body[0]._id, userID);

        const data = [];

        for (const feature of req.body) {
            const { _id, sort } = feature;
            const updatedFeature = await Feature.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedFeature);
        }

        res.json({ data });
    } catch (err) {
        err.errorCode = 'features_007';
        next(err);
    }
}


module.exports = {
    getFeatures,
    getFeature,
    createFeature,
    updateFeature,
    deleteFeature,
    createSubFeature,
    sortFeatures
}
const Feature = require('./features.model');

/**
 * Get features
 * @param project - id of project
 * @returns [{ feature }]
 */
async function getFeatures(req, res) {
    try {
        const features = await Feature
            .find({ project: req.params.project })
            .sort({ sort: 1 });

        res.json(features);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get feature by ID
 * @param id - ID of feature to fetch
 * @returns feature {}   
 */
async function getFeature(req, res) {
    try {
        const feature = await Feature.findById(req.params.id).populate('sub_features');
        res.json(feature);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a feature
 * @property {String} req.body.name 
 * @property {String} req.body.project 
 * @returns feature {}   
 */
async function createFeature(req, res) {
    try {
        const features = await Feature.find({ project: req.body.project });

        const feature = await Feature.create({
            ...req.body,
            sort: features.length
        });

        res.json(feature);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Update feature
 * @params id
 * @property {String} req.body.name 
 * @returns feature {}   
 */
async function updateFeature(req, res, next) {
    try {
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
async function createSubFeature(req, res) {
    try {
        const { featureID } = req.params;

        const feature = await Feature.findById(featureID).populate('sub_features');

        const subFeature = await Feature.create({
            ...req.body,
            project: feature.project,
            sort: feature.sub_features.length,
            main_feature: featureID
        });

        res.json(subFeature);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}



module.exports = {
  getFeatures, 
  getFeature,
  createFeature,
  updateFeature,
  createSubFeature
}
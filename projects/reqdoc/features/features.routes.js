const express = require('express')
const router = express.Router()

const featureCtrl = require('./features.controller');
const { protect } = require('../utils/middleware');

router.route('/sort').put(featureCtrl.sortFeatures)

/** 
* @post api/reqdoc/features/:featureID/sub - create a sub feature
*/
router.route('/:featureID/sub').post(featureCtrl.createSubFeature)

/**
 * @get api/reqdoc/features/:featureID 
 * @get api/reqdoc/features/:featureID
 * @get api/reqdoc/features/:featureID 
 */
router.route('/:featureID').get(protect('feature'), featureCtrl.getFeature)
router.route('/:featureID').put(featureCtrl.updateFeature)
router.route('/:featureID').delete(featureCtrl.deteleteFeature)

/**
* @get api/reqdoc/features - get all features
* @post api/reqdoc/features - create new feature
*/
router.route('/').get(featureCtrl.getFeatures)
router.route('/').post(featureCtrl.createFeature)





module.exports = router; 
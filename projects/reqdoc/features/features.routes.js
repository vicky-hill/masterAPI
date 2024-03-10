const express = require('express')
const router = express.Router()

const featureCtrl = require('./features.controller');

router.route('/sort').put(featureCtrl.sortFeatures)

/** 
* @post api/reqdoc/features/:featureID/sub - create a sub feature
*/
router.route('/:featureID/sub').post(featureCtrl.createSubFeature)

/**
 * @get api/reqdoc/features/:id - get feature by id
 */
router.route('/:featureID').get(featureCtrl.getFeature)

/**
* @get api/reqdoc/features - get all features
* @post api/reqdoc/features - create new feature
*/
router.route('/').get(featureCtrl.getFeatures)
router.route('/').post(featureCtrl.createFeature)





module.exports = router; 
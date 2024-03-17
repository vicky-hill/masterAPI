const express = require('express')
const router = express.Router()

const featureCtrl = require('./features.controller')
const { protect } = require('../utils/middleware')

router.route('/sort').put(protect, featureCtrl.sortFeatures)

/** 
* @post api/reqdoc/features/:featureID/sub - create a sub feature
*/
router.route('/:featureID/sub').post(protect, featureCtrl.createSubFeature)

/**
 * @get api/reqdoc/features/:featureID 
 * @get api/reqdoc/features/:featureID
 * @get api/reqdoc/features/:featureID 
 */
router.route('/:featureID').get(protect, featureCtrl.getFeature)
router.route('/:featureID').put(protect, featureCtrl.updateFeature)
router.route('/:featureID').delete(protect, featureCtrl.deteleteFeature)

/**
* @get api/reqdoc/features/:projectID - get all features by project
* @post api/reqdoc/features - create new feature
*/
router.route('/:projectID').get(protect, featureCtrl.getFeatures)
router.route('/').post(protect, featureCtrl.createFeature)





module.exports = router; 
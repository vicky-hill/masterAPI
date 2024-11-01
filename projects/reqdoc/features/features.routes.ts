import { createFeature, createSubFeature, deleteFeature, getFeature, getFeatures, sortFeatures, updateFeature } from './features.controller'
import express from 'express'
import { protect } from '../utils/middleware'

const router: any = express.Router()

router.route('/sort').put(protect, sortFeatures)

/** 
* @post api/reqdoc/features/:featureID/sub - create a sub feature
*/
router.route('/:featureID/sub').post(protect, createSubFeature)

/**
 * @get api/reqdoc/features/:featureID 
 * @get api/reqdoc/features/:featureID
 * @get api/reqdoc/features/:featureID 
 */
router.route('/:featureID').get(protect, getFeature)
router.route('/:featureID').put(protect, updateFeature)
router.route('/:featureID').delete(protect, deleteFeature)

/**
* @get api/reqdoc/features/:projectID - get all features by project
* @post api/reqdoc/features - create new feature
*/
router.route('/:projectID').get(protect, getFeatures)
router.route('/').post(protect, createFeature)



export default router;
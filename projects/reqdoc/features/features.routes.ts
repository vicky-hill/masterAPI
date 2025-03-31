import { createFeature, createSubFeature, deleteFeature, getFeature, getFeatures, sortFeatures, updateFeature } from './features.controller'
import express from 'express'
import { protect } from '../utils/middleware'

const router: any = express.Router()

/* ====================================
   Features @ api/reqdoc/features
==================================== */

router.route('/sort').put(protect, sortFeatures)

router.route('/:featureId').get(protect, getFeature)
router.route('/:featureId').put(protect, updateFeature)
router.route('/:featureId').delete(protect, deleteFeature)

router.route('/:featureId/sub').post(protect, createSubFeature)

router.route('/project/:projectKey').get(protect, getFeatures)

router.route('/').post(protect, createFeature)


export default router;
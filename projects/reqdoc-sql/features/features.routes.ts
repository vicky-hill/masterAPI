import { getProjectFeatures, getFeature, updateFeature, deleteFeature, createSubFeature, createFeature } from './features.controller'
import { protect } from '../utils/middleware'
import express, { Router } from 'express'

const router: Router = express.Router();

/* ====================================
   Features @ api/reqdoc-sql/features
==================================== */

// router.route('/sort').put(protect, sortFeatures)

router.route('/:featureId').get(protect, getFeature)
router.route('/:featureId').put(protect, updateFeature)
router.route('/:featureId').delete(protect, deleteFeature)

router.route('/:featureId/sub').post(protect, createSubFeature)

router.route('/project/:projectKey').get(protect, getProjectFeatures)

router.route('/').post(protect, createFeature)


export default router;
import express, { Router } from 'express'
import { getReqById, createReq, updateReq, deleteReq, getReqByKey, getReqsByFeatureId, changeReq, sortReqs, searchReqs } from './reqs.controller'
import { protect } from '../utils/middleware'

const router: Router = express.Router();

/* ====================================
   @ /reqs
==================================== */


router.route('/').post(protect, createReq)

router.route('/:projectId/search').get(protect, searchReqs)
router.route('/feature/:featureId').get(protect, getReqsByFeatureId)
router.route('/:projectKey/:reqKey').get(protect, getReqByKey)

router.route('/sort').put(protect, sortReqs)
router.route('/:reqId').get(protect, getReqById)
router.route('/:reqId').put(protect, updateReq)
router.route('/:reqId').delete(protect, deleteReq)

router.route('/change/:reqId').put(protect, changeReq)


export default router;
import express from 'express'
import { protect } from '../utils/middleware'
import { addComment, changeReq, createReq, deleteComment, deleteReq, editComment, getFeatureReqs, getProjectReqs, getReqById, getReqByKey, searchReqs, sortReqs, updateReq } from './reqs.controller'

const router: any = express.Router();

/* ====================================
   Reqs @ api/reqdoc/reqs
==================================== */

router.route('/sort').put(protect, sortReqs)
router.route('/:projectId/search').get(protect, searchReqs)
router.route('/:projectKey/:reqKey/retrieve').get(protect, getReqByKey)
router.route('/:reqId/change').put(protect, changeReq)
router.route('/:reqId/update').put(protect, updateReq)
router.route('/:reqId/retrieve').get(protect, getReqById)
router.route('/:reqId/delete').delete(protect, deleteReq)

router.route('/:reqId/comment').post(protect, addComment)
router.route('/:commentID/comment').put(protect, editComment)
router.route('/:commentID/comment').delete(protect, deleteComment)

router.route('/feature/:featureId').get(protect, getFeatureReqs)
router.route('/project/:projectId').get(protect, getProjectReqs)

router.route('/').post(protect, createReq)

export default router;
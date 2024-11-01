import express from 'express'
import { protect } from '../utils/middleware'
import { addComment, changeReq, createReq, deleteComment, deleteReq, editComment, getFeatureReqs, getProjectReqs, getReqById, getReqByKey, searchReqs, sortReqs, updateReq } from './reqs.controller'

const router: any = express.Router()

/** 
* @put api/reqdoc/reqs/sort - sort reqs
* @get api/reqdoc/reqs/:projectID/search - search reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
* @post api/reqdoc/reqs/:reqID/update - update a req
* @post api/reqdoc/reqs/:reqID/retrieve - get a single req
*/
router.route('/sort').put(protect, sortReqs)
router.route('/:projectID/search').get(protect, searchReqs)
router.route('/:projectKey/:reqKey/retrieve').get(protect, getReqByKey)
router.route('/:reqID/change').put(protect, changeReq)
router.route('/:reqID/update').put(protect, updateReq)
router.route('/:reqID/retrieve').get(protect, getReqById)
router.route('/:reqID/delete').delete(protect, deleteReq)


/**
 * @post api/reqdoc/reqs/:reqID/comment - add a comment
 * @put api/reqdoc/reqs/:commentID/comment - edit a comment
 * @delete api/reqdoc/reqs/:commentID/comment - delete a comment
 */
router.route('/:reqID/comment').post(protect, addComment)
router.route('/:commentID/comment').put(protect, editComment)
router.route('/:commentID/comment').delete(protect, deleteComment)


/**
 * @get api/reqdoc/reqs/:featureID - get reqs by feature
 */
router.route('/feature/:featureID').get(protect, getFeatureReqs)
router.route('/project/:projectID').get(protect, getProjectReqs)


/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(protect, createReq)

export default router;
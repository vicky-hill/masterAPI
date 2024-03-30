const express = require('express')
const router = express.Router()
const reqCtrl = require('./reqs.controller')
const { protect } = require('../utils/middleware')

/** 
* @put api/reqdoc/reqs/sort - sort reqs
* @get api/reqdoc/reqs/:projectID/search - search reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
* @post api/reqdoc/reqs/:reqID/update - update a req
* @post api/reqdoc/reqs/:reqID/retrieve - get a single req
*/
router.route('/sort').put(protect, reqCtrl.sortReqs)
router.route('/:projectID/search').get(protect, reqCtrl.searchReqs)
router.route('/:reqID/change').put(protect, reqCtrl.changeReq)
router.route('/:reqID/update').put(protect, reqCtrl.updateReq)
router.route('/:reqID/retrieve').get(protect, reqCtrl.getReq)
router.route('/:reqID/delete').delete(protect, reqCtrl.deleteReq)




/**
 * @post api/reqdoc/reqs/:reqID/comment - add a comment
 * @put api/reqdoc/reqs/:commentID/comment - edit a comment
 * @delete api/reqdoc/reqs/:commentID/comment - delete a comment
 */
router.route('/:reqID/comment').post(protect, reqCtrl.addComment)
router.route('/:commentID/comment').put(protect, reqCtrl.editComment)
router.route('/:commentID/comment').delete(protect, reqCtrl.deleteComment)

/**
 * @get api/reqdoc/reqs/:featureID - get reqs by feature
 */
router.route('/:featureID').get(protect, reqCtrl.getReqs)


/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(protect, reqCtrl.createReq)




module.exports = router; 
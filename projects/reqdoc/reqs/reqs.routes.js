const express = require('express')
const router = express.Router()
const reqCtrl = require('./reqs.controller')
const { protect } = require('../utils/middleware')

/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(protect, reqCtrl.createReq)

/** 
* @put api/reqdoc/reqs/sort - sort reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
* @post api/reqdoc/reqs/:reqID/update - update a req
* @post api/reqdoc/reqs/:reqID/retrieve - get a single req
*/
router.route('/sort').put(protect, reqCtrl.sortReqs)
router.route('/:reqID/change').put(protect, reqCtrl.changeReq)
router.route('/:reqID/update').put(protect, reqCtrl.updateReq)
router.route('/:reqID/retrieve').get(protect, reqCtrl.getReq)
router.route('/:reqID/delete').delete(protect, reqCtrl.deleteReq)

/**
 * @get api/reqdoc/reqs/:featureID - get reqs by feature
 */
router.route('/:featureID').get(protect, reqCtrl.getReqs)




module.exports = router; 
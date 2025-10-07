import express, { Router } from 'express'
import { getReqs, getReq, createReq, updateReq, deleteReq } from './reqs.controller'

const router: Router = express.Router();

/* ====================================
   @ /reqs
==================================== */

router.route('/').get(getReqs)
router.route('/').post(createReq)

router.route('/:reqId').get(getReq)
router.route('/:reqId').put(updateReq)
router.route('/:reqId').delete(deleteReq)


export default router;
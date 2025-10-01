import express, { Router } from 'express'
import { getFeatures } from './features.controller'

const router: Router = express.Router();

/* ====================================
   @ /features
==================================== */

router.route('/project/:projectId').get(getFeatures)


export default router;
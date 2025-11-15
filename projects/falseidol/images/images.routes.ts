import express, { Router } from 'express'
import { getImages, importImages } from './images.controller'

const router: Router = express.Router();

/* ====================================
   @ /images
==================================== */

router.route('/').get(getImages)
router.route('/import').post(importImages)


export default router;
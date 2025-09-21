import express, { Router } from 'express'
import { getImages, getImage, createImage, updateImage, deleteImage } from './images.controller'

const router: Router = express.Router();

/* ====================================
   @ api/fluent/images
==================================== */

router.route('/').get(getImages)
router.route('/').post(createImage)

router.route('/:imageId').get( getImage)
router.route('/:imageId').delete(deleteImage)
router.route('/:imageId').put(updateImage)

export default router;
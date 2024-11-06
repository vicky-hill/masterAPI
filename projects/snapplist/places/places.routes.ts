import express from 'express'
import { test } from './places.controller'
const router = express.Router()


router.route('/').get(test);
// router.route('/').post(createPlace);
// router.route('/:id/photos').get(getPhotos);


export default router; 
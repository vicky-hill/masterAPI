import express, { Router } from 'express'
import { createLessons, getLessons } from './lessons.controller'

const router: Router = express.Router();

/* ====================================
   @ /api/fluent/lessons
==================================== */

router.route('/').get(getLessons)
router.route('/').post(createLessons)


export default router;
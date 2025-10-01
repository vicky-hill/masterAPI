import express, { Router } from 'express'
import { getLessons } from './lessons.controller'

const router: Router = express.Router();

/* ====================================
   @ /api/fluent/lessons
==================================== */

router.route('/').get(getLessons)


export default router;
import express from 'express'
import { protect } from '../utils/middleware'
import { createProject, deleteProject, getProject, getProjects, updateProject } from './projects.controller'

const router: any = express.Router()


/* ====================================
   Projects @ api/reqdoc/projects
==================================== */

router.route('/').get(protect, getProjects)
router.route('/').post(protect, createProject)

router.route('/:projectId').get(protect, getProject)
router.route('/:projectId').delete(protect, deleteProject)
router.route('/:projectId').put(protect, updateProject)


export default router;
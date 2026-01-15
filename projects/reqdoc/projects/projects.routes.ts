import express, { Router } from 'express'
import { protect } from '../utils/middleware'
import {getProjectsByTeam, getProjectById, createProject, deleteProject, updateProject} from './projects.controller'


const router: Router = express.Router();


/* ====================================
   @ api/reqdoc/projects
==================================== */

router.route('/').get(protect, getProjectsByTeam)
router.route('/').post(protect, createProject)

router.route('/:projectId').get(protect, getProjectById)
router.route('/:projectId').put(protect, updateProject)
router.route('/:projectId').delete(protect, deleteProject)





export default router;
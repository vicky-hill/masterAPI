import express from 'express'
import { protect } from '../utils/middleware'
import { createProject, deleteProject, getProject, getProjects, updateProject } from './projects.controller'

const router: any = express.Router()

/**
 * @get api/reqdoc/projects - get all projects
 * @post api/reqdoc/projects - create new project
 */
router.route('/').get(protect, getProjects)
router.route('/').post(protect, createProject)
    

/**
 * @get api/reqdoc/projects/:projectID - get project by id
 * @put api/reqdoc/projects/:projectID - update project
 * @delete api/reqdoc/projects/:projectID - delete project
 */
router.route('/:projectID').get(protect, getProject)
router.route('/:projectID').delete(protect, deleteProject)
router.route('/:projectID').put(protect, updateProject)

export default router;
const express = require('express')
const router = express.Router()
const { protect } = require('../utils/middleware')
const projectCtrl = require('./projects.controller')

/**
 * @get api/reqdoc/projects - get all projects
 * @post api/reqdoc/projects - create new project
 */
router
    .route('/')
    .get(protect, projectCtrl.getProjects)
    .post(protect, projectCtrl.createProject)

/**
 * @get api/reqdoc/projects/:projectID - get project by id
 * @put api/reqdoc/projects/:projectID - update project
 * @delete api/reqdoc/projects/:projectID - delete project
 */
router.route('/:projectID').get(protect, projectCtrl.getProject)
router.route('/:projectID').delete(protect, projectCtrl.deleteProject)
router.route('/:projectID').put(protect, projectCtrl.updateProject)
   


module.exports = router; 
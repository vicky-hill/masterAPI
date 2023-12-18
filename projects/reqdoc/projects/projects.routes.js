const express = require('express')
const router = express.Router()

const projectCtrl = require('./projects.controller');

/**
 * @get api/reqdoc/projects - get all projects
 * @post api/reqdoc/projects - create new project
 */
router
    .route('/')
    .get(projectCtrl.getProjects)
    .post(projectCtrl.createProject)

/**
 * @get api/reqdoc/projects/:id - get location by id
 */
router
    .route('/:projectID')
    .get(projectCtrl.getProject)
   




module.exports = router; 
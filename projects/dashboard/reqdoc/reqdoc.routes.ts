import express from 'express'
import { getFeatures, getFeature, createFeature, updateFeature, deleteFeature } from './features.dashboard'
import { getProjects, getProject, createProject, updateProject, deleteProject } from './projects.dashboard'
import { getReqs, getReq, createReq, updateReq, deleteReq } from './reqs.dashboard'
import { getTeams, getTeam, createTeam, updateTeam, deleteTeam } from './teams.dashboard'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './users.dashboard'

const router: any = express.Router()

/* ================================================
   Features @ api/dashboard/reqdoc/features
================================================ */

router.route('/features').get(getFeatures)
router.route('/features').post(createFeature)

router.route('/features/:featureId').get( getFeature)
router.route('/features/:featureId').delete(deleteFeature)
router.route('/features/:featureId').put(updateFeature)


/* ================================================
   Projects @ api/dashboard/reqdoc/projects
================================================ */

router.route('/projects').get(getProjects)
router.route('/projects').post(createProject)

router.route('/projects/:projectId').get( getProject)
router.route('/projects/:projectId').delete(deleteProject)
router.route('/projects/:projectId').put(updateProject)


/* ================================================
   Reqs @ api/dashboard/reqdoc/reqs
================================================ */

router.route('/reqs').get(getReqs)
router.route('/reqs').post(createReq)

router.route('/reqs/:reqId').get( getReq)
router.route('/reqs/:reqId').delete(deleteReq)
router.route('/reqs/:reqId').put(updateReq)


/* ================================================
   Teams @ api/dashboard/reqdoc/teams
================================================ */

router.route('/teams').get(getTeams)
router.route('/teams').post(createTeam)

router.route('/teams/:teamId').get( getTeam)
router.route('/teams/:teamId').delete(deleteTeam)
router.route('/teams/:teamId').put(updateTeam)


/* ================================================
   Users @ api/dashboard/reqdoc/users
================================================ */

router.route('/users').get(getUsers)
router.route('/users').post(createUser)

router.route('/users/:userId').get( getUser)
router.route('/users/:userId').delete(deleteUser)
router.route('/users/:userId').put(updateUser)


export default router;
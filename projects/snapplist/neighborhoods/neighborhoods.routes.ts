import express from 'express'
import { getNeighborhoods, getNeighborhoodById, createNeighborhood, updateNeighborhood, deleteNeighborhood } from './neighborhoods.controller'

const router: any = express.Router()

/**
 * @get api/snapplist/neighborhoods - get all neighborhoods
 * @post api/snapplist/neighborhoods - create new neighborhood
 */
router.route('/').get(getNeighborhoods)
router.route('/').post(createNeighborhood)

/**
 * @get api/snapplist/projects/:neighborhoodID - get neighborhood by id
 * @put api/snapplist/projects/:neighborhoodID - update neighborhood
 * @delete api/snapplist/projects/:neighborhoodID - delete neighborhood
 */
router.route('/:neighborhoodId').get( getNeighborhoodById)
router.route('/:neighborhoodId').delete(deleteNeighborhood)
router.route('/:neighborhoodId').put(updateNeighborhood)

export default router;
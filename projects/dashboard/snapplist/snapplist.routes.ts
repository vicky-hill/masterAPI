import express from 'express'
import { getNeighborhoods, getNeighborhood, createNeighborhood, updateNeighborhood, deleteNeighborhood } from './neighborhoods.dashboard'
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from './categories.dashboard'
import { getPlaces, getPlace, createPlace, updatePlace, deletePlace } from './places.dashboard'


const router: any = express.Router()

/* =======================================================
   Neighborhoods @ api/dashboard/snapplist/neighborhoods
======================================================= */

router.route('/neighborhoods').get(getNeighborhoods)
router.route('/neighborhoods').post(createNeighborhood)

router.route('/neighborhoods/:neighborhoodId').get( getNeighborhood)
router.route('/neighborhoods/:neighborhoodId').delete(deleteNeighborhood)
router.route('/neighborhoods/:neighborhoodId').put(updateNeighborhood)


/* =======================================================
   Categories @ api/dashboard/snapplist/categories
======================================================= */

router.route('/categories').get(getCategories)
router.route('/categories').post(createCategory)

router.route('/categories/:categoryId').get( getCategory)
router.route('/categories/:categoryId').delete(deleteCategory)
router.route('/categories/:categoryId').put(updateCategory)


/* =======================================================
   Places @ api/dashboard/snapplist/places
======================================================= */

router.route('/places').get(getPlaces)
router.route('/places').post(createPlace)

router.route('/places/:placeId').get( getPlace)
router.route('/places/:placeId').delete(deletePlace)
router.route('/places/:placeId').put(updatePlace)


export default router;
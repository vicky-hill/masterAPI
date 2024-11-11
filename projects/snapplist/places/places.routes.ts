import express from 'express'
import {test, getPlaces, deleteAllPlaces, deletePlace} from './places.controller'
const router = express.Router()




/* ================================================
   Places @ api/snapplist/places/search
================================================ */

router.route('/search').get(test);

// router.route('/delete').delete(deleteAllPlaces);


/* ================================================
   Places @ api/snapplist/places
================================================ */
router.route('/').get(getPlaces);

router.route('/:placeId').delete(deletePlace);




export default router; 
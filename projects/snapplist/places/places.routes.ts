import express from 'express'
import {test, getPlaces, deleteAllPlaces, deletePlace, addPlaceToUserList, removePlaceFromUserList} from './places.controller'
import { protect } from '../utils/middleware'
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
router.route('/add/:list/:placeId').put(protect, addPlaceToUserList);
router.route('/remove/:list/:placeId').put(protect, removePlaceFromUserList);




export default router; 
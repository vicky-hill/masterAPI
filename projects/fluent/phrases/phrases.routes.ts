import express, { Router } from 'express'
import { getPhrases, getPhrase, createPhrase, updatePhrase, deletePhrase } from './phrases.controller'

const router: Router = express.Router();

/* ====================================
   @ /phrases
==================================== */

router.route('/').get(getPhrases)
router.route('/').post(createPhrase)

router.route('/:phraseId').get(getPhrase)
router.route('/:phraseId').put(updatePhrase)
router.route('/:phraseId').delete(deletePhrase)


export default router;
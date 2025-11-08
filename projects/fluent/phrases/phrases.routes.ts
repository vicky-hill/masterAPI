import express, { Router } from 'express'
import { getPhrases, getPhrase, createPhrase, updatePhrase, deletePhrase, createPhrases, resetPhraseSort, sortPhrases } from './phrases.controller'

const router: Router = express.Router();

/* ====================================
   @ /phrases
==================================== */

router.route('/').get(getPhrases)
router.route('/').post(createPhrases)

router.route('/reset/:lessonId').put(resetPhraseSort);
router.route('/sort').put(sortPhrases);

router.route('/:phraseId').get(getPhrase)
router.route('/:phraseId').put(updatePhrase)
router.route('/:phraseId').delete(deletePhrase)


export default router;
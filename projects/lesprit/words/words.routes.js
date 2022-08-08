const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/auth');

const wordCtrl = require('./words.controller');


// api/words

router
    .route('/')
    .get(protect, wordCtrl.getWords)
    .post(protect, wordCtrl.saveWord)

router
    .route('/review')
    .get(protect, wordCtrl.getReview)

router 
    .route('/:id')
    .get(protect, wordCtrl.getWord)
    .put(protect, wordCtrl.updateWord)
    .delete(protect, wordCtrl.deleteWord)

router
    .route('/devtools/all')
    .put(wordCtrl.devAll)


module.exports = router; 


/* 
    
    GET @ api/words
        Response [{ _id, rating, foreign, native, user(_id), dueDate, list: {_id, title} }]

    POST @ api/words
        Payload { foreign, native, user(_id), list(_id)}
        Response { _id, rating, foreign, native, dueDate, user(_id), list(_id)}

    GET @ api/words/:id
        Response { _id, rating, foreign, native, dueDate, user(_id), list(_id)}

    PUT @ api/words/:id
        Payload { rating|| foreign || native || dueDate }
        Response { _id, rating, foreign, native, user(_id), dueDate, list: {_id, title} }

    DELETE @ api/wors/:id
        Response { _id, rating, foreign, native, dueDate, user(_id), list(_id) }

    GET @ ap/words/review
        Response [{ _id, rating, foreign, native, dueDate, user(_id), list(_id) }]

*/
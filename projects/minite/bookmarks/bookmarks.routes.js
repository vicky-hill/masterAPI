const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/auth');

const bookmarkCtrl = require('./bookmarks.controller');

router
    .route('/')
    .get(protect, bookmarkCtrl.getBookmarks)
    .post(protect, bookmarkCtrl.saveBookmark)
    

router
    .route('/sort')
    .put(protect, bookmarkCtrl.sortBookmarks)

router
    .route('/:id')
    .put(protect, bookmarkCtrl.updateBookmark)
    .delete(protect, bookmarkCtrl.deleteBookmark)


/* 
    GET @ api/bookmark
        Response [{ _id, sort, name, icon, user, primary }]

    POST @ api/bookmark
        Payload { name, icon }
        Response { _id, sort, name, icon, user, primary }

    PUT @ api/bookmark/sort
        Payload [{ _id, sort, name, icon, user, primary }]
        Response [{ _id, sort, name, icon, user, primary }]

    PUT @ api/bookmark/:id
        Payload { name || sort || icon }
        Response { _id, sort, name, icon, user, primary }

    DELETE @ api/bookmark/:id
        Response { _id, sort, name, icon, user, primary }
*/



module.exports = router;
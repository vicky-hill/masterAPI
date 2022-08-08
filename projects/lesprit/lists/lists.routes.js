const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/auth');

const listCtrl = require('./lists.controller');

// api/lists

router
    .route('/')
    .get(protect, listCtrl.getLists)
    .post(protect, listCtrl.saveList)
    .delete(protect, listCtrl.deleteUserLists)

router
    .route('/:id')
    .get(protect, listCtrl.getList)
    .delete(protect, listCtrl.deleteList)
    .put(protect, listCtrl.updateList)



module.exports = router; 


/* 
    
    GET @ api/lists
        Response [{ _id, user(_id), title, slug }]

    POST @ api/lists
        Payload { title, user(_id) }
        Response { _id, title, slug, user(_id) }

    DELETE @ api/lists
        Response { deleted: # }

    GET @ api/lists/:id
        Response { _id, title, slug, user(_id) }

    PUT @ api/lists/:id
        Payload { title }
        Response { _id, title, slug, user(_id) }

    DELETE @ api/lists/:id
        Response { _id, title, slug, user(_id)}
    
*/
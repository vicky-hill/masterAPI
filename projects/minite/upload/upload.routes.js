const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/auth');

const uploadCtrl = require('./upload.controller');


// api/upload
router
    .route('/image')
    .get(protect, uploadCtrl.uploadImage)




module.exports = router; 


/* 
    
    POST @ api/upload/image?count=
        Response [{key, url}]

*/

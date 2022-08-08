const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/auth');

const authCtrl = require('./auth.controller');


// api/user

router
    .route('/register')
    .post(authCtrl.register)

router
    .route('/login')
    .post(authCtrl.login)
    
router  
    .route('/')
    .get(protect, authCtrl.getUser);

router
    .route('/:id')
    .delete(authCtrl.deleteUser)

router
    .route('/:id/languages')
    .put(protect, authCtrl.changeLanguages)


module.exports = router; 


/* 
    
    POST @ api/user/register
        Payload { name, email, password, languages: [{native, foreign}] }
        Response { token }

    POST @ api/user/login
        Payload { name, password }
        Response { token }

    GET @ api/user
        Response { _id, name, languages: [{native, foreign}] }

    DELETE @ api/user/:id
        Response { _id, name, languages: [{native, foreign}] }

    PUT @ api/user/:id/languages
        Payload { languages: [{ native, foreign }] }
        Response { _id, name, languages: [{native, foreign}] }

*/

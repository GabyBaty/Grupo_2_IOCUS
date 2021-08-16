const express = require('express');
var router = express.Router();
const {login,profile} = require('../controllers/usersController')


/* GET users listing. */
router.get('/login', login);
router.get('/profile', profile);
module.exports = router;

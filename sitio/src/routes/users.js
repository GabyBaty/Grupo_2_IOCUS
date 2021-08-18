const express = require('express');
var router = express.Router();
const {login,processRegister,profile} = require('../controllers/usersController')

const registerValidations= require('../validations/registerValidation')



/* GET users listing. */
router.get('/login', login);
router.post('/login',registerValidations, processRegister);
router.get('/profile', profile);
module.exports = router;

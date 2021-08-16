const express = require('express');
var router = express.Router();
const {login,processRegister} = require('../controllers/usersController')

const registerValidations= require('../validations/registerValidation')


/* GET users listing. */
router.get('/login', login);
router.post('/login',registerValidations, processRegister);

module.exports = router;

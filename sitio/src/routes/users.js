const express = require('express');
var router = express.Router();
const {login,processRegister,profile, processLogin,logout,editProfile, updateProfile} = require('../controllers/usersController')

const registerValidations= require('../validations/registerValidation')

const loginValidations= require('../validations/loginValidations')
const editUserValidations = require ('../validations/editUserValidations')


//middleware de sesiones
const profileUserCheck = require('../middleware/profileUserCheck')
const loginUserCheck =require('../middleware/loginUserCheck')

//multer
const multerAvatar = require('../middleware/multerAvatar')



/* GET users listing. */
router.get('/login',loginUserCheck, login);
router.post('/login/regData',registerValidations, processRegister);
router.get('/profile',multerAvatar.any(),profileUserCheck, profile);
router.post('/login/logData', loginValidations, processLogin);
router.get('/logout',logout);
/*Edicion de Usuario*/
router.get('/edit-profile/:id',editProfile)
router.put('/edit-profile/:id',multerAvatar.single('fotoUsuario'),editUserValidations,updateProfile)

module.exports = router;

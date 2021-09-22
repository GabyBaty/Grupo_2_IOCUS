const {check,body} = require('express-validator');
const db = require('../../database/models');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres')
    .isAlpha().withMessage('El nombre debe contener solo letras'),


    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El apellido tiene que tener como mínimo 2 caracteres')
    .isAlpha().withMessage('El apellido debe contener solo letras'),

    body('correo')
    .custom(value => {
        console.log(value)
        return db.User.findOne({
            where : {
                correo: value
            }
        }).then(user => {
            if(user){
                return Promise.reject('El email ya está registrado')
            }
        })
    }),

    check('password')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden'),

    check('acepta')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]

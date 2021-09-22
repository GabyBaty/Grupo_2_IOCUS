const {check,body} = require('express-validator');
const db = require('../../database/models');   //no pasa naranja con estos. Ta to' peola

module.exports = [
    check('profileUserEditNombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({
        min : 3,
        max : 20
    }).withMessage('El nombre tiene que tener como mínimo 3 caracteres')
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('profileUserEditApellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({
        min : 3,
        max : 50
    }).withMessage('El apellido tiene que tener como mínimo 2 caracteres')
    .isAlpha().withMessage('El apellido debe contener solo letras'),
    
]

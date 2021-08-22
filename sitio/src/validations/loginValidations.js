const {check,body} = require('express-validator');
/*   PARA CUANDO ENTRE EL TEMA DE LA BASE DE DATOS
 const Usuarios = require('../data/users_db');
const bcrypt = require('bcryptjs'); */   


module.exports = [
    check('correolog')
    .notEmpty().withMessage('AAAAAAAAAAAAAAAAAAAAAAAAAAA'),

    check('passwordlog')
    .notEmpty().withMessage('El password es obligatorio')
]
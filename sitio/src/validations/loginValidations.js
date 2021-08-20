const {check,body} = require('express-validator');
const Usuarios = require('../data/users_db');
const bcrypt = require('bcryptjs');


module.exports = [
    check('correo')
    .notEmpty().withMessage('El email es obligatorio'),

    check('password')
    .notEmpty().withMessage('El password es obligatorio')
]
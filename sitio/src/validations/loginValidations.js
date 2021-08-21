const {check,body} = require('express-validator');
const usuarios = require('../data/users_db');
const bcrypt = require('bcryptjs');



    module.exports = [
        body('correologin')
        .custom((value,{req}) => {
            let usuario = usuarios.find(usuario => usuario.correo === value && bcrypt.compareSync(req.body.passwordlogin,usuario.password));
            if (usuario){
                return true
            }else{
                return false
            }
        }).withMessage('credenciales inválidas')
    ]
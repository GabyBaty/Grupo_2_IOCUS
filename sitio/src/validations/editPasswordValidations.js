const {check,body} = require('express-validator');
const db = require('../../database/models');  //no pasa naranja con estos. Ta to' peola
module.exports = [
check('profileUserEditPassword')
.isLength({
    min : 6,
    max : 12
}).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

check('confirmEditPassword')
.custom((value,{req}) => {
    if(value !== req.body.profileUserEditPassword){
        return false
    }
    return true
}).withMessage('Las contraseñas no coinciden'),

]
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
let usuarios= require('../data/users_db');
const bcrypt = require('bcryptjs');


let guardarJSON = (productos) =>{fs.writeFileSync(path.join(__dirname,"../data/users.json"),JSON.stringify(productos,null,2),'utf-8')}



module.exports = {
    login: (req,res) => {
        return res.render('users/login', { title: 'IOCUS-LOGIN' });
    },
    processRegister: (req,res) => {
        let errores = validationResult(req);
        let {nombre,apellido,correo,password} = req.body;
        

        if(errores.isEmpty()){
            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre,
                apellido,
                correo,
                password:bcrypt.hashSync(password,10),
                
            }
            usuarios.push(usuario);
            guardarJSON(usuarios);
            res.redirect('/');
        }else{
            return res.render('users/login',{
                title:"Registro de Usuario",
                 old : req.body,
                 errores:errores.mapped()
              }
          )}
        }
      
  
}
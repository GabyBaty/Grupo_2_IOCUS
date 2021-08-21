const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
let usuarios= require('../data/users_db');
const bcrypt = require('bcryptjs');


let guardarJSON = (productos) =>{fs.writeFileSync(path.join(__dirname,"../data/users.json"),JSON.stringify(productos,null,2),'utf-8')}



module.exports = {
    login: (req,res) => {
        return res.render('users/login', { title: 'IOCUS-LOGIN',
        usuario:req.session.usuario
    });
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
        },
      
  
   
    
    

    processLogin: (req,res) => {
       let errores = validationResult(req);
        const {correologin} = req.body;

        if (errores.isEmpty()) {
            let usuario = usuarios.find(usuario => usuario.correo === correologin )
            req.session.usuario = {
                id:usuario.id,
                nombre :usuario.nombre,
                

            }
            return res.redirect('/')
        } else {
            return res.render('users/login',{
                title:"Login de Usuario",
                errores:errores.mapped(),
                usuario:req.session.usuario
              })
        
    }},

    profile: (req,res) => {
        return res.render('users/profile', {
            title: 'Mi perfil'
        })
    }
}

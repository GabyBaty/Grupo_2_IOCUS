const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
let db= require(path.join(__dirname,'../../database/models'));
const bcrypt = require('bcryptjs');
const { profile } = require('console');


module.exports = {
    login: (req, res) => {
        return res.render('users/login', {
            title: 'IOCUS-LOGIN',
            usuario: req.session.usuario
        });
    },

    processRegister: (req, res) => {
        let errores = validationResult(req);
        let { nombre, apellido, correo, password} = req.body;
        if (errores.isEmpty()) {
            db.User.create({
                nombre: nombre.trim(),
                apellido : apellido.trim(),
                correo: correo.trim(),
                password : bcrypt.hashSync(password,10),
                avatar : 'default.png',
                role : 'Usuario'
            }).then(user => {
                req.session.usuario = {
                    id : user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    correo: user.correo,
                    avatar: user.avatar,
                    role : user.role
                }
                return res.redirect('/')
            }).catch(error => console.log(error))
        } else {
            return res.render('users/login', {
                title: "Registro de Usuario",
                old: req.body,
                errores: errores.mapped()
            }
            )
        }
    },

processLogin: (req, res) => {
        let errores = validationResult(req);
        const { correoLogin, recordar} = req.body;

        if (errores.isEmpty()) {
            db.User.findOne({
                where : {
                  correo : correoLogin
                }
            }).then(user => {
                req.session.usuario = {
                    id : user.id,
                    nombre : user.nombre,
                    apellido : user.apellido,
                    correo: user.correo,
                    role : user.role,
                    avatar : user.avatar
                }
                recordar && res.cookie('iocusForever',req.session.usuario,{maxAge: 1000 * 60})
                return res.redirect('/')
            })
           
        } else {
            return res.render('users/login', {
                title: "Login de Usuario",
                errores: errores.mapped(),
                usuario: req.session.usuario
            })


        }
    },

    profile: (req, res) => {
        db.User.findByPk(req.session.usuario.id)
        .then(usuario=>{

            return res.render('users/profile', {
                title: 'Mi perfil',
                usuario,
                
            })
            
        })
    },
    
    editProfile: (req,res) => {
        
        db.User.findByPk(req.session.usuario.id)
        .then(usuario =>{
            return res.render('users/edit-profile', {
              title: 'Editar mi Perfil',
              usuario,
              

        })
        })
        
    },
    
    
    updateProfile: (req,res) => {
        let errores = validationResult(req)
        const {profileUserEditNombre,profileUserEditApellido,avatar} = req.body;
    
        if (errores.isEmpty()) {
        db.User.update(
            {
                nombre : profileUserEditNombre.trim(),
                apellido: profileUserEditApellido.trim(),
                avatar : req.file ? req.file.filename : req.session.usuario.avatar
            },
            {
                where : {
                    id : req.params.id
                },
            })
            
            .then( result  => {
                if (result){
                req.session.usuario = {
                    id: req.session.usuario.id,
                    nombre:profileUserEditNombre,
                    apellido:profileUserEditApellido,
                    avatar : req.file ? req.file.filename : req.session.usuario.avatar,
                    correo: req.session.usuario.correo,
                    role: req.session.usuario.role
                }
            }
           /*  res.cookie('iocusForever', req.session.usuario), */
            res.redirect('/')
        })
        } else {
            return res.render('users/edit-profile', {
                title: "Login de Usuario",
                errores: errores.mapped(),
                usuario: req.session.usuario,
                user,
                role: user.role
            })


        }
    },



    logout: (req, res) => {
        req.session.destroy(); 
        res.cookie('iocusForever',null,{maxAge:-1})

        return res.redirect('/')
    },

    editPassword: (req,res) => {
       
         db.User.findByPk(req.session.usuario.id)
        .then(usuario =>{
            return res.render('users/edit-password', {
              title: 'Editar mi contraseña',
              usuario,
               

        })
        })
    },


    updatePassword: (req,res) => {
        let errores = validationResult(req)
        const {profileUserEditPassword} = req.body
        let hashiada = bcrypt.hashSync(profileUserEditPassword,10)
        
        
        if (errores.isEmpty()) {
        db.User.update(
            {
               password: profileUserEditPassword ? hashiada  : req.session.usuario.password ,

               avatar : req.file ? req.file.filename : req.session.usuario.avatar,
            },
            {
                where : {
                    id : req.params.id
        
           
                    }
                }
            )
            .then( result  => {
                if (result){
                req.session.usuario = {
                    id: req.session.usuario.id,
                    nombre:req.session.usuario.nombre,
                    apellido:req.session.usuario.apellido,
                    avatar : req.file ? req.file.filename : req.session.usuario.avatar,
                    correo: req.session.usuario.correo,
                    role: req.session.usuario.role
                }
            }
          
            res.redirect('/')
        })
        
    } else {
        return res.render('users/edit-password', {
            title: "Login de Usuario",
            errores: errores.mapped(),
            usuario: req.session.usuario.id,
            user,
            role: user.role
        })
    }
}

}

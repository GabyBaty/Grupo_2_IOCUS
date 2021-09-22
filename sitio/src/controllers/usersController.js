const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
let db= require(path.join(__dirname,'../../database/models'));
const bcrypt = require('bcryptjs');


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
        const { correo, recordar} = req.body;

        if (errores.isEmpty()) {
            db.User.findOne({
                where : {
                  correo
                }
            }).then(user => {
                req.session.usuario = {
                    id : user.id,
                    nombre : user.nombre,
                    apellido : user.apellido,
                    correo:user.correo,
                    role : user.role,
                    avatar : user.avatar
                }
                recordar && res.cookie('iocusForever',req.session.userLogin,{maxAge: 1000 * 60})
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
        return res.render('users/profile', {
            title: 'Mi perfil',
            usuario: req.session.usuario
        })
    },
    
    editProfile: (req,res) => {
        let usuario = req.session.usuario
        let user = dbUsuarios.find(user=>user.id === +req.params.id)
        return res.render('users/edit-profile', {
          title: 'Editar Mi Perfil',
          usuario,
          user
        })
    },
    
    
    updateProfile: (req,res) => {
        let errores = validationResult(req)
        const {profileUserEditNombre,profileUserEditApellido,avatar} = req.body
        
        
        
        dbUsuarios.forEach(user =>{ 
            if(user.id == +req.params.id) { 
                if(errores.isEmpty()) {
                    
                    user.nombre =profileUserEditNombre,
                    user.apellido = profileUserEditApellido,
                    user.avatar = req.file ? req.file.filename : user.avatar,
                    
                    
                    req.session.usuario = {
                        id: user.id,
                        nombre: profileUserEditNombre,
                        apellido:profileUserEditApellido,
                        avatar:(req.file) ? req.file.filename : user.avatar,
                        correo: user.correo,
                        role: user.role
                    }
        
                    guardarJSON(dbUsuarios)
                    res.cookie('iocusForever', req.session.usuario)
                    return res.redirect('/users/profile')
                
                }else {
                        return res.render('users/edit-profile', {
                        title: "Editar mi Perfil",
                        errores: errores.mapped(),
                        usuario: req.session.usuario,
                        user
                    })
        }
    }


       
    })},



    logout: (req, res) => {
        req.session.destroy(); 
        res.cookie('iocusForever',null,{maxAge:-1})

        return res.redirect('/')
    },

    editPassword: (req,res) => {
        let usuario = req.session.usuario
        let user = dbUsuarios.find(user=>user.id === +req.params.id)
        return res.render('users/edit-password', {
          title: 'Editar mi contraseña',
          usuario,
          user
        })
    },


    updatePassword: (req,res) => {
        let errores = validationResult(req)
        const {profileUserEditPassword} = req.body
        let hashiada = bcrypt.hashSync(profileUserEditPassword,10)
        
        
        dbUsuarios.forEach(user =>{ 
            if(user.id == +req.params.id) {   
                if(errores.isEmpty()) {
                    user.password= profileUserEditPassword ? hashiada  : user.password ,
                    
                    req.session.usuario = {
                        id: user.id,
                        nombre: user.nombre,
                        apellido:user.apellido,
                        password:profileUserEditPassword ? hashiada  : user.password ,
                        avatar:(req.file) ? req.file.filename : user.avatar,
                        correo: user.correo,
                        role: user.role
                    }
        
                    guardarJSON(dbUsuarios)
                    res.cookie('iocusForever', req.session.usuario)
                    return res.redirect('/users/profile')
                
                }else {
                        return res.render('users/edit-password', {
                        title: "Editar mi contraseña",
                        errores: errores.mapped(),
                        usuario: req.session.usuario,
                        user
                    })
        }
    }


       
    })},
}

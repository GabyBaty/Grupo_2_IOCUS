const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
let dbUsuarios = require('../data/users_db');
const bcrypt = require('bcryptjs');


let guardarJSON = (usuarios) => { fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(usuarios, null, 2), 'utf-8') }



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
            let usuario = {
                id: dbUsuarios.length > 0 ? dbUsuarios[dbUsuarios.length - 1].id + 1 : 1,
                nombre,
                apellido,
                correo,
                password:bcrypt.hashSync(password,10),
                role:"Usuario",
                avatar:"default.png"
            }
            dbUsuarios.push(usuario);
            guardarJSON(dbUsuarios);
            res.redirect('/');
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
        const { correologin, recordar} = req.body;

        if (errores.isEmpty()) {
            dbUsuarios.forEach(usuario => {
                if (usuario.correo == correologin) {
                    req.session.usuario = {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        avatar: usuario.avatar,
                        apellido: usuario.apellido,
                        correo: usuario.correo,
                        role:usuario.role
                    }
                }
            });

            if (recordar) {
                res.cookie('iocusForever', req.session.usuario, { maxAge: 1000 * 60 *60})
            }
            return res.redirect('/')
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

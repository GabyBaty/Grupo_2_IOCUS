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
                role:"user",
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
        const {profileUserEditNombre,profileUserEditApellido,profileUserEditPassword,avatar} = req.body
        dbUsuarios.forEach(user =>{
            if(user.id == +req.params.id) {   
                    user.nombre =profileUserEditNombre,
                    user.apellido = profileUserEditApellido,
                    user.avatar = (req.files) ? req.files.filename : user.avatar
                    
                    user.password=bcrypt.hashSync(profileUserEditPassword,10),
                    req.session.usuario = {
                        nombre: profileUserEditNombre,
                        apellido:profileUserEditApellido,
                        password:bcrypt.hashSync(profileUserEditPassword,10),
                        avatar:(req.files) ? req.files.filename : user.avatar
                    }
                }
        })
        guardarJSON(dbUsuarios)
        return res.redirect('/users/profile')
    },



    logout: (req, res) => {
        req.session.destroy(); 
        res.cookie('iocusForever',null,{maxAge:-1})

        return res.redirect('/')
    }

}

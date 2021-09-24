let productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const { validationResult } = require('express-validator');
const fs = require('fs')
const path = require('path')
let db= require(path.join(__dirname,'../../database/models'));

module.exports = {
    detail : (req,res) => {
     db.Product.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'images'},
                {association : 'category'},
                {association : 'age'}
            ]
        }).then(producto => {
            db.Category.findOne({
                where : {
                    id : producto.categoryId
                },
                include : [
                    {
                        association : 'products',
                        include : [
                            {association : 'images'}
                        ]
                    }
                ]
            }).then(category =>{
                return res.render('products/detail',{
                    title: 'IOCUS-DETALLE' ,
                    producto,
                    toThousand,
                    finalPrice,
                    usuario:req.session.usuario,
                   
                })
            })
        }).catch(error => console.log(error))

    },
    
    
    cart: (req,res) => {
        return res.render('products/cart', { title: 'IOCUS-CARRITO' });
    },
    add: (req,res) => {
        return res.render('products/add', { title: 'Agregar producto', productos,usuario:req.session.usuario, });
    },
    save: async (req, res) =>{
        try {
            let errores = validationResult(req);
            
            if (!errores.isEmpty()) {
                res.render('products/add', { 
                    title:'carga de productos',
                    errores : errores.mapped(),
                    old : req.body
                })
            } 

            const {sku,name,category,brand,age,price,discount,stock,destacado,description,detail1,detail2,detail3} = req.body
            let producto = await db.Product.create({
                ...req.body,
                name : name.trim(),
                description : description.trim(),
                categoryId: +req.body.category,
                brandId: +req.body.brand,
                ageId: +req.body.age,
                destacado: +req.body.destacado
            })            
            let images = req.files;
            if(images.length > 0){ 
                await images.forEach(img => {
                    db.Image.create({
                        file: img.filename,
                        productId : producto.id
                    })
                }
            )} else { 
                await db.Image.create({
                        file: "default-image.jpg",
                        productId : producto.id
                    })
            }
            
            res.redirect ('/')
        }
        catch (error) { console.log(error) }
    },



    edit : (req,res) => {
        let categorias = db.Category.findAll();
        let producto = db.Product.findByPk(req.params.id,{
            include : [
                {association : 'images'},
                {association : 'category'},
                {association : 'age'}
            ]
        });
        Promise.all([categorias,producto])
        .then(([categorias,producto]) => {
            return res.render('products/edit',{
                title:'Edición de producto',
                categorias,
                producto
            })
        })
      
    },
    update: async (req,res) => {
        const {sku,name,category,brand,age,price,discount,stock,destacado,description} = req.body
   
      
       let producto=   await db.Product.update(
            {
                ...req.body,
                name : name.trim(),
                description : description.trim(),
               
            },
            {
                where : {
                    id : req.params.id
                }
            },
            ) 

            let images = req.files;
            if(images.length > 0){ 
                await images.forEach(img => {
                    db.Image.update({
                        file: img.filename,
                       
                    },
                    {
                        where :{
                            id : req.params.id
                            }
                     }
                )
                }
            )} else { 
                await db.Image.update({
                        file: "default-image.jpg",
                        productId : producto.id
                    })
                    
                }
      
        res.redirect('/')
        .catch(error => console.log(error))
    },

    remove : (req,res) => {
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        }).then( () => res.redirect('/'))
        .catch(error => console.log(error))
    },
    
    filter: (req,res) => {
         db.Product.findAll({
            include : [
                {association : 'images'},
                {association : 'brand'}
            ]
         })
        .then(productos => {
            return res.render('products/filter', { 
                title: 'IOCUS-LISTA',
                productos,
                toThousand,
                finalPrice,
                usuario:req.session.usuario,
             });
        })
        
    },
}
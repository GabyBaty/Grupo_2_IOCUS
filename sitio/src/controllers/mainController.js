const fs = require('fs');
const path = require('path');
const productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const busqueda = require('../utils/searchRelevance')
let db= require(path.join(__dirname,'../../database/models'));
const {Op} = require('sequelize');
const { query } = require('express');


module.exports = {
    index: (req,res) => {
     
      let destacados = db.Product.findAll(
        {
            where:{
                destacado:true
            },
            include:[
              {
                association:'images'             
               }
            ]
        });
      
    Promise.all([destacados])
    .then(([destacados]) => { 
      
      return res.render('index', { 
        title: 'IOCUS-INDEX',
        destacados,
        toThousand, 
        finalPrice,
        
        })
    }).catch(error => console.log(error))
      
    },
    contacto: (req,res) => {
        return res.render('contacto', { title: 'IOCUS-CONTACTO',
        usuario:req.session.usuario, });
    },
    about: (req,res) => {
        return res.render('about', { title: 'IOCUS-ABOUT', usuario:req.session.usuario});
    },  
    search : (req,res) => {
       let marcas = db.Brand.findAll();
       let categorias =  db.Category.findAll();
       let edades = db.Age.findAll();
      let productos= db.Product.findAll({
          where : {
              [Op.or] : [
                  {
                      name :  {
                          [Op.substring] : req.query.keywords
                      }
                  },
                  {
                     description: {
                          [Op.substring] : req.query.keywords
                      }
                  }
              ]
          },
          include: [
            { association: "images"}, 

            {association : 'category',
            where:{
                id: {
                    [Op.substring] : req.query.categoryId  ? req.query.categoryId  : ''
                }
            }
            },
            
            { association: "brand",
            where:{
                id: {
                    [Op.substring] : req.query.brandId ? req.query.brandId : ''
                }
            }
        
        }
        
        ],
           
      })
      Promise.all([productos,marcas,categorias,edades]) 
      .then(([productos,marcas,categorias,edades]) => res.render('products/filter',{
          title:'busqueda',
          productos,
          toThousand, 
          finalPrice,
          marcas,
          categorias,
          edades,
          categoryId :req.query.categoryId,
          brandId: req.query.brandId,
          usuario:req.session.usuario,
          busqueda : req.query.keywords
      })).catch(error => console.log(error))

  },
}
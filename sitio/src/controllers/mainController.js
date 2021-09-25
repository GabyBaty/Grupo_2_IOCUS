const fs = require('fs');
const path = require('path');
const productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const busqueda = require('../utils/searchRelevance')
let db= require(path.join(__dirname,'../../database/models'));
const {Op} = require('sequelize');


module.exports = {
    index: (req,res) => {
     
      let Product = db.Product.findAll(
        {
            where:{
                destacado:true
            },
            include:[
              {
                association:'images'             
               }
            ]
        }
        
      )
      
      .then(destacados=>{
     
        return res.render('index', { 
            title: 'IOCUS-INDEX',
            destacados,
            toThousand, 
            finalPrice,
          
        
        }).catch(error => console.log(error))
      }


      )
      
    },
    contacto: (req,res) => {
        return res.render('contacto', { title: 'IOCUS-CONTACTO',
        usuario:req.session.usuario, });
    },
    about: (req,res) => {
        return res.render('about', { title: 'IOCUS-ABOUT', usuario:req.session.usuario});
    },  
    search : (req,res) => {
      db.Product.findAll({
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
          include:[
            { association:'images' },
             {association : 'brand'}
          ]
          
      }).then(productos=> res.render('products/filter',{
          title:'busqueda',
          productos,
          toThousand, 
          finalPrice,
          usuario:req.session.usuario,
          busqueda : req.query.keywords
      })).catch(error => console.log(error))

  },
}
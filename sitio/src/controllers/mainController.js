const fs = require('fs');
const path = require('path');
const productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const busqueda = require('../utils/searchRelevance')
let db= require(path.join(__dirname,'../../database/models'));



module.exports = {
    index: (req,res) => {
     
      let products = db.products.findAll(
        {
            where:{
                destacado:true
            },
            include:[
              {
                association:'categories'             
               }
            ]
        }
        
      )
      
      .then(destacados=>{
     
        return res.render('index', { 
            title: 'IOCUS-INDEX',
            products,
            destacados,
            toThousand, 
            finalPrice,
            usuario:req.session.usuario
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
    search: (req, res) => {
		let inputs = req.query.keywords.trim()
		let resultados = busqueda(inputs)
		return res.render('results', {
            title: 'Resultados de búsqueda',
			resultados,
			busqueda: req.query.keywords,
			toThousand,
			finalPrice,
            usuario:req.session.usuario,
            
		})
	}
}
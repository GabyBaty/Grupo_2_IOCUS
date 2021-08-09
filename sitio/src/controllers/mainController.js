const productos = require('../data/products_db');

const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')

module.exports = {
    index: (req,res) => {
        let destacados = productos.filter(producto => producto.destacado === 'on')
        return res.render('index', { 
            title: 'IOCUS-INDEX',
            productos,
            destacados,
            toThousand, 
            finalPrice
        });
    },
    contacto: (req,res) => {
        return res.render('contacto', { title: 'IOCUS-CONTACTO' });
    },
    about: (req,res) => {
        return res.render('about', { title: 'IOCUS-ABOUT'});
    },  
    
}
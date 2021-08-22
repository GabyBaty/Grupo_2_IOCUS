const productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const busqueda = require('../utils/searchRelevance')

module.exports = {
    index: (req,res) => {
        let destacados = productos.filter(producto => producto.destacado === 'on')
        return res.render('index', { 
            title: 'IOCUS-INDEX',
            productos,
            destacados,
            toThousand, 
            finalPrice,
            usuario:req.session.usuario
        });
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
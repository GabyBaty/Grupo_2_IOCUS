const productos = require('../data/products_db');

const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')

module.exports = {
    
    detail: (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);
        return res.render('products/detail', { 
            title: 'IOCUS-DETALLE' ,
            producto,
            toThousand,
            finalPrice
        
        });
    },
    cart: (req,res) => {
        return res.render('products/cart', { title: 'IOCUS-CARRITO' });
    },
    add: (req,res) => {
        return res.render('products/add', { title: 'Agregar prodcuto' });
    },
    
    edit: (req,res) => {
        return res.render('products/edit',
         { title: 'Editar prodcuto' },
         );
    },
    filter: (req,res) => {
        return res.render('products/filter', { 
            title: 'IOCUS-LISTA',
            productos,
            toThousand,
            finalPrice
         });
    },
}
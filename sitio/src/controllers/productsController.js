let productos = require('../data/products_db');
const toThousand = require('../utils/toThousand')
const finalPrice = require('../utils/finalPrice')
const fs = require('fs')
const path = require('path')

let guardarJSON = (productos) =>{fs.writeFileSync(path.join(__dirname,"../data/products.json"),JSON.stringify(productos,null,2),'utf-8')}

module.exports = {
    
    detail: (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);
        return res.render('products/detail', { 
            title: 'IOCUS-DETALLE' ,
            producto,
            toThousand,
            finalPrice,
            usuario:req.session.usuario,
           
        
        });
    },
    cart: (req,res) => {
        return res.render('products/cart', { title: 'IOCUS-CARRITO' });
    },
    add: (req,res) => {
        return res.render('products/add', { title: 'Agregar producto', productos,usuario:req.session.usuario, });
    },
    save:(req,res) => {
        const {sku,name,category,brand,age,price,discount,stock,destacado,description,detail1,detail2,detail3} = req.body
      let details = {detail1,detail2,detail3}
     
      if(req.files){
        var imagenes = req.files.map(imagen => imagen.filename)
    }

    
        let producto = {
        id:productos[productos.length - 1].id + 1,
        sku,
        name,
        category,
        brand,
        age,
        price,
        discount,
        stock,
        destacado,
        description,
        details,
        images : req.files.length != 0 ? imagenes : ['default-image.jpg'],    
       
} 

    
 
  
    //Agregando producto y guarda al final del Json//
    productos.push(producto);
    guardarJSON(productos);
    res.redirect('/products/filter');

        },
    edit: (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);
        let categorias = producto.category
            return res.render('products/edit', { 
             title: 'Edición de producto',
             producto,
             categorias,
             usuario:req.session.usuario,
            });
    },
    update: (req,res) => {
        const {sku,name,category,brand,age,price,discount,stock,destacado,description,detail1,detail2,detail3} = req.body
        productos.forEach(producto => {
            if(producto.id == +req.params.id) {
                producto.sku = sku
                producto.name = name
                producto.category = category
                producto.brand = brand
                producto.age = age
                producto.price = +price
                producto.discount = +discount
                producto.stock = +stock
                producto.destacado = destacado
                producto.description = description
                producto.details.detail1 = detail1
                producto.details.detail2 = detail2
                producto.details.detail3 = detail3
                producto.images[0] = (req.files[0]) ? req.files[0].filename : producto.images[0]
                producto.images[1] = (req.files[1]) ? req.files[1].filename : producto.images[1]
                producto.images[2] = (req.files[2]) ? req.files[2].filename : producto.images[2]
               
      
            }
        });
        
        guardarJSON(productos)
        return res.redirect('/')
    },
    borrar: (req,res) =>{
        productos=productos.filter(producto =>producto.id !== +req.params.id);
        guardarJSON(productos);
        return res.redirect('/products/filter')
    },



    filter: (req,res) => {
        return res.render('products/filter', { 
            title: 'IOCUS-LISTA',
            productos,
            toThousand,
            finalPrice,
            usuario:req.session.usuario,
         });
    },
}
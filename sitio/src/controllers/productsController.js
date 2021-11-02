let productos = require("../../database/models/product");
const toThousand = require("../utils/toThousand");
const finalPrice = require("../utils/finalPrice");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const { IncomingMessage } = require("http");
let db = require(path.join(__dirname, "../../database/models"));
const {Op} = require('sequelize');

module.exports = {
    detail: (req, res) => {
        db.Product.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                { association: "images" },
                { association: "category" },
                { association: "age" },
            ],
        })
            .then((producto) => {
                db.Category.findOne({
                    where: {
                        id: producto.categoryId,
                    },
                    include: [
                        {
                            association: "products",
                            include: [{ association: "images" }],
                        },
                    ],
                }).then((category) => {
                    return res.render("products/detail", {
                        title: "IOCUS-DETALLE",
                        producto,
                        toThousand,
                        finalPrice,
                        usuario: req.session.usuario,
                    });
                });
            })
            .catch((error) => console.log(error));
    },

    cart: (req, res) => {
        return res.render("products/cart", { title: "IOCUS-CARRITO" });
    },
    add: (req, res) => {
        return res.render("products/add", {
            title: "Agregar producto",
            productos,
            usuario: req.session.usuario,
        });
    },
    save: async (req, res) => {
        try {
            let errores = validationResult(req);
              
            if (!errores.isEmpty()) {
                let images = req.files;
                images.forEach(img => {
                    if(fs.existsSync(path.join(__dirname, '../../public/img/detalle/' + img.filename))){
                        fs.unlinkSync(path.join(__dirname, '../../public/img/detalle/' + img.filename))
                    }
                });
                res.render("products/add", {
                    title: "Agregar un Producto",
                    errores: errores.mapped(),
                    productos
                    
                });

            }

            const {name,description} = req.body
            let producto = await db.Product.create({
                ...req.body,
                name: name.trim(),
                description: description.trim(),
                categoryId: +req.body.category,
                brandId: +req.body.brand,
                ageId: +req.body.age,
                destacado: +req.body.destacado,
            });
            let images = req.files;
            if (images.length > 0) {
                await images.forEach((img) => {
                    db.Image.create({
                        file: img.filename,
                        productId: producto.id,
                    });
                });
            } else {
                await db.Image.create({
                    file: "default-image.jpg",
                    productId: producto.id,
                });
            }
            
            
            setTimeout(()=> {res.redirect('/')},1000)
        } catch (error) {
            console.log(error);
        }
    },

    edit: (req, res) => {
        let categorias = db.Category.findAll();
        let marcas = db.Brand.findAll();
        let edades = db.Age.findAll();
        let producto = db.Product.findByPk(req.params.id,{
            include : [
                {association : 'images'},
                {association : 'category'},
                {association : 'age'},
                {association : 'brand'}
            ]
        });
        Promise.all([categorias,marcas,edades,producto])
        .then(([categorias,marcas,edades,producto]) => {
            return res.render('products/edit',{
                title:'Edición de producto',
                categorias,
                marcas,
                edades,
                producto
            })
        })
      
    },
    update: async (req,res) => {
        
        const {name,description} = req.body
        try{
          let errores = validationResult(req);
          

        if (!errores.isEmpty()) {
            let images = req.files;
            images.forEach(img => {
                if(fs.existsSync(path.join(__dirname, '../../public/img/detalle/' + img.filename))){
                    fs.unlinkSync(path.join(__dirname, '../../public/img/detalle/' + img.filename))
                }
            });
            let producto = await db.Product.findByPk(req.params.id,{
                include : [
                    {association : 'images'},
                    {association : 'category'},
                    {association : 'age'},
                    {association : 'brand'}
                ]
            });
            let categorias = await db.Category.findAll();
            let marcas = await db.Brand.findAll();
            let edades = await db.Age.findAll();
            
            res.render('products/edit',{
                    title:'Edición de producto',
                    errores: errores.mapped(),
                    categorias,
                    marcas,
                    edades,
                    producto
                })
            

        }

           db.Product.update(
            {
                ...req.body,
                name : name.trim(),
                description : description.trim(),
                categoryId: +req.body.category,
                brandId: +req.body.brand,
                ageId: +req.body.age,
                destacado: +req.body.destacado
               
            },
            {
                where : {
                    id : req.params.id
                }
            },
        )  
             
        if(req.files.length > 0) {
                let uploadImages = req.files.map(img => img.filename)   //Se crea un array de la propiedad "filename" basado en req.files
                
                let productImages = await db.Image.findAll({where: {productId: req.params.id}})   //Se crea un array de la base de datos 

                for (let i = 0; i < productImages.length; i++) {   // Se realiza el update de cada img en la db
                     db.Image.update({
                        file: uploadImages[i]
                    },
                    {
                        where:{
                        id: productImages[i].id
                    }})
                }

                for (const oldImage of productImages) {
                    
                    fs.unlinkSync(path.join(__dirname, '../../public/img/detalle/' + oldImage.file))  // Se eliminan los datos antigüos
                }
            }
        setTimeout(()=> {res.redirect('/')},1000)
        
    }catch (error) {
        console.log(error)
    }
       
   
    },

    remove: (req, res) => {
        db.Product.destroy({
            
            where: {
                id: req.params.id,
            },
            
        })
            
            .then(() => res.redirect("/products/filter"))
            .catch((error) => console.log(error)); 

    },

    filter: (req, res) => {
       let marcas = db.Brand.findAll();
       let categorias =  db.Category.findAll();
       let edades = db.Age.findAll();

        let productos= db.Product.findAll({
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
        .then(([productos,marcas,categorias,edades]) => {
            return res.render("products/filter", {
                title: "IOCUS-LISTA",
                productos,
                toThousand,
                finalPrice,
                marcas,
                categorias,
                edades,
                categoryId :req.query.categoryId,
                brandId: req.query.brandId,
                usuario: req.session.usuario,
            });
        });

    },


};

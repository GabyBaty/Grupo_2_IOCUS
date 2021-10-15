let productos = require("../../database/models/product");
const toThousand = require("../utils/toThousand");
const finalPrice = require("../utils/finalPrice");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
let db = require(path.join(__dirname, "../../database/models"));

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

            if (errores.isEmpty()) {
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
            
            res.redirect('/');
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
        let producto = await db.Product.update(
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
            let dbImages = await db.Image.findAll({where : {productId : req.params.id}})
            
            let match_db_file = [];
            
            for (let i = 0; i < dbImages.length; i++) {
                
                    /* resultado.push(dbImages[i-1].file) */
                    /* resultado.push(false) */
                
                    match_db_file.push( {
                        file: req.files[i].filename,
                        pk: dbImages[i].id
                        })
                }
            if (req.files.length > dbImages.length) {
                let excess = []
                for (let i = dbImages.length + 1; i < req.files.length; i++) {   //esto va desde el final de dbImages hasta el final de req.files.length
                excess.push()
                
            }
            
            match_db_file.map(e => {
                db.Image.update({file:e.file}, {where:{id: e.pk}})
                
            }
            )   /* console.log(e); */
            }
            /* await db.Image.update({file: resultado[0]}, {where: {id : dbImages[0].id}}) 
            await db.Image.update({file: resultado[1]}, {where: {id : dbImages[1].id}})
            await db.Image.update({file: resultado[2]}, {where: {id : dbImages[2].id}})  */
            
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
        db.Product.findAll({
            include: [{ association: "images" }, { association: "brand" }],
        }).then((productos) => {
            return res.render("products/filter", {
                title: "IOCUS-LISTA",
                productos,
                toThousand,
                finalPrice,
                usuario: req.session.usuario,
            });
        });
    },
};

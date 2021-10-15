const {check,body} = require('express-validator');
const path = require('path');



module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({
        min: 4
    }).withMessage('El nombre debe tener como mínimo 4 caracteres'),

    check('description')
    .notEmpty().withMessage('Debe añadir una descripción')
    .isLength({
        max: 450
    }).withMessage('La descripción debe tener como máximo 450 caracteres'),

    
    body("imagesProductAdd").custom((value,{req})=>{
      let extensions = [".jpg",".jpeg",".gif",".png",".webp"]
        if(req.files.length <3 || req.files.length >3 ){
            throw new Error('solo puede cargar 3 imagenes');
          
      }else{
          for (let i=0;i< req.files.length; i++) {
              if(!extensions.includes(path.extname(req.files[i].originalname))){
                  throw new Error(`las extensiones permitidas son ${extensions.join(", ")}`);
              }
          }

          return true
      }
  }),



    check('category')
    .notEmpty().withMessage('Seleccione una categoría'),

    check('brand')
    .notEmpty().withMessage('Seleccione una marca'),

    check('age')
    .notEmpty().withMessage('Seleccione un rango de edad'),

    check('sku')
    .notEmpty().withMessage('El SKU es obligatorio')
    .isAlphanumeric().withMessage('El campo no debe contener carácteres especiales'),

    check('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isNumeric().withMessage('Por favor ingrese un valor numérico')
    ,

    check('stock')
    .notEmpty().withMessage('El stock es obligatorio')
    .isNumeric().withMessage('Por favor ingrese un valor numérico')
    ,

    check('discount')
    .notEmpty().withMessage('El descuento es obligatorio')
    .isNumeric().withMessage('Por favor ingrese un valor numérico')
    ,
]
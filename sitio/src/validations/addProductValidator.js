const {check,body} = require('express-validator');



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

    
    body('imagesProductAdd')
    /* .notEmpty().withMessage('Debe seleccionar 3 imagenes') */
    .custom((value,{req}) => {
        if(req.files.length !== 1) {
            return true
        } else {
            return false
        }
    }).withMessage('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    ,


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
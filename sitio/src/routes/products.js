const express = require('express');

const router = express.Router();
const uploadFile = require('../middleware/multerMiddleware')
const {detail, cart, add, edit, filter, update, save, remove} = require('../controllers/productsController');


const addProductValidator = require('../validations/addProductValidator')

const adminUserCheck=require('../middleware/adminUserCheck');
const editProductValidator = require('../validations/editProductValidator');


/* GET products page. */
router.get('/detail/:id', detail);
router.get('/cart/', cart);
router.get('/add',adminUserCheck, add);
router.post('/add',uploadFile.any('imagesProductAdd'),addProductValidator,save);



/* EDITAR UN PRODUCTO Y GUARDAR LOS CAMBIOS */
router.get('/edit/:id',adminUserCheck, edit);
router.put('/edit/:id',uploadFile.any('imagesProductAdd',3),editProductValidator,update);
router.delete('/delete/:id',adminUserCheck, remove);
router.get('/filter',filter);

module.exports = router;

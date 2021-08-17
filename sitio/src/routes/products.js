const express = require('express');

const router = express.Router();
const uploadFile = require('../middleware/multerMiddleware')
const {detail, cart, add, edit, filter, update, save, borrar} = require('../controllers/productsController');




/* GET products page. */
router.get('/detail/:id', detail);
router.get('/cart/', cart);
router.get('/add', add);
router.post('/add',uploadFile.any('imagesProductAdd'),save);



/* EDITAR UN PRODUCTO Y GUARDAR LOS CAMBIOS */
router.get('/edit/:id', edit);
router.put('/edit/:id',uploadFile.any('imagesProductAdd'),update);
router.delete('/delete/:id',borrar);
router.get('/filter',filter);

module.exports = router;
